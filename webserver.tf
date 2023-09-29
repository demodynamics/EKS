# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# VPC
resource "aws_vpc" "demo_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

tags = {
    Name = "demo_vpc"
}

}



# Internet Gateaway
resource "aws_internet_gateway" "digw" {
  vpc_id = aws_vpc.demo_vpc.id

  tags = {
    Name = "digw"
  }
}


# Subnets
resource "aws_subnet" "private-demo-subnet1" {
  vpc_id     = aws_vpc.demo_vpc.id
  cidr_block = "10.0.0.0/19"
  availability_zone = "us-east-1a"

tags = {
  "Name" = "private-demo-subnet1"
  "kubernetes.io/role/internal-elb" = "1"
  "kubernetes.io/cluster/demo" = "owned"
  
}

}

resource "aws_subnet" "private-demo-subnet2" {
  vpc_id     = aws_vpc.demo_vpc.id
  cidr_block = "10.0.32.0/19"
  availability_zone = "us-east-1b"

  tags = {
  "Name" = "private-demo-subnet2"
  "kubernetes.io/role/internal-elb" = "1"
  "kubernetes.io/cluster/demo" = "owned"
  }
  
}

resource "aws_subnet" "public-demo-subnet1a" {
  vpc_id     = aws_vpc.demo_vpc.id
  cidr_block = "10.0.64.0/19"
  availability_zone = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
  "Name" = "public-demo-subnet1a"
  "kubernetes.io/role/internal-elb" = "1"
  "kubernetes.io/cluster/demo" = "owned"
  }
  
}

resource "aws_subnet" "public-demo-subnet1b" {
  vpc_id     = aws_vpc.demo_vpc.id
  cidr_block = "10.0.96.0/19"
  availability_zone = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
  "Name" = "public-demo-subnet1b"
  "kubernetes.io/role/internal-elb" = "1"
  "kubernetes.io/cluster/demo" = "owned"
  }
  
}


# Nat Gateway
resource "aws_eip" "demo_nat" {
    domain   = "vpc"
    tags = {
      Name = "demo_nat"
    }
  
}


resource "aws_nat_gateway" "demo_nat" {
  allocation_id = aws_eip.demo_nat.id
  subnet_id     = aws_subnet.public-demo-subnet1a.id

  tags = {
    Name = "demo_nat"
  }

  depends_on = [aws_internet_gateway.digw]
  
}

# Security Groups

resource "aws_security_group" "demo_sg" {
  name        = "demo-security-group"
  description = "Demo security group"
  vpc_id      = aws_vpc.demo_vpc.id

  # Define inbound and outbound rules
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


# Routing Tables
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.demo_vpc.id

  route {
      cidr_block                 = "0.0.0.0/0"
      nat_gateway_id             = aws_nat_gateway.demo_nat.id
    }
  

  tags = {
    Name = "private"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.demo_vpc.id

  route {
      cidr_block                 = "0.0.0.0/0"
      gateway_id                 = aws_internet_gateway.digw.id

    }

  tags = {
    Name = "public"
  }
}

resource "aws_route_table_association" "private-demo-subnet1" {
  subnet_id      = aws_subnet.private-demo-subnet1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private-demo-subnet2" {
  subnet_id      = aws_subnet.private-demo-subnet2.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "public-demo-subnet1a" {
  subnet_id      = aws_subnet.public-demo-subnet1a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public-demo-subnet1b" {
  subnet_id      = aws_subnet.public-demo-subnet1b.id
  route_table_id = aws_route_table.public.id
}



# EKS Cluster
resource "aws_iam_role" "demo" {
  name = "eks-cluster-demo"

  assume_role_policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {"AWS": "arn:aws:iam::218347759346:user/eks-demo-user"},
            "Action": "sts:AssumeRole"
        },

        {
            "Effect": "Allow",
            "Principal": {"Service": "eks.amazonaws.com"},
            "Action": "sts:AssumeRole"
        }
    ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "demo-AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.demo.name
}

resource "aws_iam_role_policy_attachment" "demo-AmazonEKSVPCResourceController" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSVPCResourceController"
  role       = aws_iam_role.demo.name
}

resource "aws_eks_cluster" "demo" {
  name     = "demo"
  role_arn = aws_iam_role.demo.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.private-demo-subnet1.id,
      aws_subnet.private-demo-subnet2.id,
      aws_subnet.public-demo-subnet1a.id,
      aws_subnet.public-demo-subnet1b.id
    ]
  }

  depends_on = [
    aws_iam_role_policy_attachment.demo-AmazonEKSClusterPolicy,
    aws_iam_role_policy_attachment.demo-AmazonEKSVPCResourceController,
  ]

}


# Node
resource "aws_iam_role" "nodes" {
  name = "eks-node-group-nodes"

  assume_role_policy = jsonencode({
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
    Version = "2012-10-17"
  })
}

resource "aws_iam_role_policy_attachment" "nodes-AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.nodes.name
}

resource "aws_iam_role_policy_attachment" "nodes-AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.nodes.name
}

resource "aws_iam_role_policy_attachment" "nodes-AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.nodes.name
}

resource "aws_eks_node_group" "demo-nodes" {
  cluster_name    = aws_eks_cluster.demo.name
  node_group_name = "demo-nodes"
  node_role_arn   = aws_iam_role.nodes.arn

  subnet_ids = [
    aws_subnet.private-demo-subnet1.id,
    aws_subnet.private-demo-subnet2.id
  ]

  capacity_type  = "ON_DEMAND"
  instance_types = ["t3.small"]

  scaling_config {
    desired_size = 1
    max_size     = 5
    min_size     = 0
  }

  update_config {
    max_unavailable = 1
  }

  labels = {
    role = "general"
  }

  depends_on = [
    aws_iam_role_policy_attachment.nodes-AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.nodes-AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.nodes-AmazonEC2ContainerRegistryReadOnly,
  ]
}


resource "aws_ecr_repository" "webserver" {
  name = "webserver"
}

output "ecr_repository_url" {
  value = aws_ecr_repository.webserver.repository_url
}

