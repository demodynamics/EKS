--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-1.pgdg22.04+1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    id uuid NOT NULL,
    login character varying(50) NOT NULL,
    password character varying(64) NOT NULL,
    "createdAt" character varying(50)
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- Name: basket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.basket (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    card character varying(1000000),
    ip character varying(64),
    "createdAt" date DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.basket OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: list; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.list (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(50) NOT NULL,
    img character varying(50),
    price integer NOT NULL,
    "typeId" uuid NOT NULL,
    "oldPrice" integer,
    country character varying(100),
    "itemType" character varying(100),
    taste character varying(100),
    fortress character varying(100),
    carbonation character varying(100),
    "bottleType" character varying(100),
    volume character varying(100),
    brand character varying(100)
);


ALTER TABLE public.list OWNER TO postgres;

--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admin (id, login, password, "createdAt") FROM stdin;
9aff025e-bca1-4ace-83b7-ae8921624e18	monya	$2b$10$cY/EU0Dwy5X4TFrpDy8R5eTPovT20yvG.L.VKB7oiD/wG7dYyqze2	2023-05-24 15:30:28.666711
ca2f2172-bf4e-4ea3-b4d7-a74f50b75af5	dastavka	$2b$10$8ZnwRARfupvDvX71sZuIH.1ddcoJJdpTozz8YZkrvlGOc2CxWelnu	2023-05-24 15:31:02.784392
13aa1250-7c1a-4af2-bbec-0e01ab0c98d0	menejer	$2b$10$T/QJ0qTxZoJPGi9pWkBieOS5q6SPayYIzxSVCQrCfXVOvJ1hhud1m	2023-05-24 15:34:00.412648
\.


--
-- Data for Name: basket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.basket (id, card, ip, "createdAt") FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name) FROM stdin;
3497daf4-5971-4927-adde-92990381ba8e	vodka
0da7da58-7b26-4c0f-8986-528534271bf3	beer
18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	wine
368db897-f92f-4a93-81df-fa67b92f2f0d	cognac
dfc6f7e4-3100-4963-8f60-571228e8db77	whiskey
cccf7ea8-e25e-47df-aa9c-5c10c52a7304	liquor
4726f1d3-9f05-4568-a24f-b2fc23b56619	tequilla
620c2066-8a39-491d-a86e-8f4568dd636a	jin
cca2137e-695d-4853-89a0-27c6a3167ffd	rom
890b9f91-bbba-4ffa-9c83-702905f41cd6	champagne
7a04ec1c-8c89-4882-95e4-2f8cb32825b0	vermouth
e27792aa-9c19-49ec-a002-9a750f5b133e	juice
f52cf384-16de-4b61-9427-1947c5ef7a23	water
0502001e-cc9f-4402-abc7-038a454e1810	snacks
1761cb87-095d-400a-bb88-ef2af0fbe872	ciggarettes
9390861d-c276-4f9f-a381-df4c91b8b07c	sticks
65801616-dd4c-43cf-a0c3-ac3663a4e2f8	el-sig
0aeebff6-247d-4445-b8fd-53548a097aca	other
abaa09aa-8e15-49d6-b540-db834c24a6eb	tobacandcalian
\.


--
-- Data for Name: list; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.list (id, name, img, price, "typeId", "oldPrice", country, "itemType", taste, fortress, carbonation, "bottleType", volume, brand) FROM stdin;
2f033d66-3991-44dd-99f0-99b99f078d57	Царская	carskaya05	1149	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0.5 л	ООО «ЛАДОГА»
37fab801-d08c-46ea-9d2d-6ab7d6a35aa8	Хорта	xorta05	749	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.5 л	ООО «Русский Север»
30e35479-a233-464b-bcf5-93963c18340f	Талка	talka05	699	3497daf4-5971-4927-adde-92990381ba8e	999	Россия	Люкс спирт	\N	40%	\N	Стекло	0.5 л	АО «Сибирский ЛВЗ»»
1b06184c-d9a9-410c-a284-d82b1acb52c6	Русский Стандарт	russstandart05	899	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.5 л	ООО «Русский Стандарт Водка»
7ab04545-0f3d-43f1-8f7a-6c231362dd6f	Пять Озер	pyatozer05	749	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.5 л	ООО «Алкогольная Сибирская Группа»
1c0efd67-0885-48b3-a722-4e8c05993dba	Зеленая марка	zelenayamarka05	649	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.5 л	АО «ЛВЗ «Топаз»
bf64c4b5-ff0f-402c-a174-acfd4092bb64	Белуга	beluga05	1499	3497daf4-5971-4927-adde-92990381ba8e	1949	Россия	Альфа спирт	\N	40%	\N	Стекло	0.5 л	ГК «Синергия»»
5c213452-0da7-4f9d-a269-67e9c7474dc7	Nemiroff клюква	nemiroffklyuk	649	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0,5Л	ООО "Объединенные пензенские водочные заводы"
baaa9bf1-2bf2-4783-bde7-b16743e36d49	Охота	oxota	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Россия	\N	\N	8,1%	\N	ж/б	0,45Л	Bravo International
a8ddf689-78c5-42e3-b748-08496716bc96	Krusovice	krusovice	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Чехия	\N	\N	4,2%	\N	ж/б	0.45л	\N
028372f7-a4ea-4418-b921-f53eb524fd93	Spaten Светлое	stapen	239	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Германия	\N	\N	5,2%	\N	ж/б	0,5л	\N
06ba1c7f-d1ef-49b7-a76d-2635f93961c5	Absolut	absolute07	2599	3497daf4-5971-4927-adde-92990381ba8e	\N	Швеция	Люкс спирт	\N	40%	\N	Стекло	0,7Л	Pernod Ricard
5b733810-c20a-442a-906f-059ef405f21c	Балтика 9 	baltika9	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Дания		\N	4,6%	\N	ж/б	0,5л	\N
3559d9f9-44b1-483f-a2ad-3efc689bfdb6	Miller	miller	159	0da7da58-7b26-4c0f-8986-528534271bf3	\N	США	\N	\N	4,4%	\N		0,5л	\N
9c77f3d5-5b30-4379-9f3a-8ea1111ea489	Miller	corona	239	0da7da58-7b26-4c0f-8986-528534271bf3	\N	США		\N	4,4%	\N	стекло	0,5л	\N
ca818949-7e5f-47c4-aa6c-613e7b8f2f87	Heineken	haineken	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Нидерланды	\N	\N	4,8%	\N	ж/б	0,43л	\N
b99a4cc1-2d02-4cca-b020-fca048c5eeae	Red Label 	redlabel07	2399	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,7л	\N
413508a3-04aa-401e-ac90-7c7c76791751	William Lawson's 	william05	1799	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,5л	\N
a81b53d0-815e-49cd-a0bb-5512ecfa0490	William Lawson''s 	william1	2399	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	1л	\N
1254419a-d232-4ec8-82ab-91c4d24db9a4	White Horse	whitehorse05	1799	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,5л	\N
34d50850-565a-42cb-a498-8f53b1b5b94c	Macallan 	makalan05	8799	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,5л	\N
e90927f3-2740-4214-9023-c5bc6e597b73	Ballantine's 	balatayns05	2299	dfc6f7e4-3100-4963-8f60-571228e8db77	2599	Шотландия	\N	\N	40%	\N	Стекло	0,5л	\N
e81c9523-13af-449c-835c-aaaec0d99b9b	Ballantine's 	balatayns07	3099	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,7л	\N
63620884-174b-4a92-a8d2-ae6f12b2a6cc	Jim Beam 	jimbeam05	2099	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	США	\N	\N	43%	\N	Стекло	0,5л	\N
d65c0c85-a594-47ab-af09-2b1cefe678fe	Jameson 	jameson1	4899	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Ирландия	\N	\N	40%	\N	Стекло	1л	\N
09076156-f20b-4351-8ea7-9e1849ba546e	Jameson	jameson07	3899	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Ирландия	\N	\N	40%	\N	Стекло	0,7л	\N
b0652192-7ee4-43d9-b928-608a4b69885e	Jack Daniel's	jack07	3599	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	США	\N	\N	40%	\N	Стекло	0,7л	\N
b597561e-2678-4fb7-b474-da1d8ce2853c	Bell''s 	bells1	2299	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	1л	\N
d07d800b-c7d3-4cc0-a047-009747b3bea5	Bell's 	bells05	1499	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,5л	\N
b7f5391a-8077-4b36-976a-08a53c6850fb	Старый Кенигсберг 4 года	starikeninsberg	1399	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Россия	\N	\N	40%	\N	Стекло	0,5л	\N
4e0fc998-360d-4949-a295-d5e27116cfb7	Старейшина 5 лет	starshina505	1899	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Россия	\N	\N	40%	\N	Стекло	0,5л	\N
c716e1ee-1524-4bf7-bf01-0225eb7416b6	Кочари 5 лет 	qochari5	1099	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Армения	\N	\N	40%	\N	Стекло	0,5л	\N
0b08aad6-75b0-4d86-9b76-2064d298a222	Кочари 3 года 	qochari3	999	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Армения	\N	\N	40%	\N	Стекло	0,5л	\N
3295878f-603e-4f64-b819-ec2a3063d239	Арарат 5 лет	ararat505	2399	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Армения	\N	\N	40%	\N	Стекло	0,5л	\N
e2c7a22c-89e9-47b1-9cac-054995fceb76	Арарат 3 года 	ararat307	1999	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Армения	\N	\N	40%	\N	Стекло	0,7л	\N
600577af-d2da-4303-b66c-1eee67baa529	Арарат 5 лет 	ararat507	2999	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Армения	\N	\N	40%	\N	Стекло	0.7л	\N
c0b9a04d-1590-411e-9b98-19b34022f233	Shustoff 5 лет 	shustov505	1299	368db897-f92f-4a93-81df-fa67b92f2f0d	1599	Украина	\N	\N	40%	\N	 Стекло	0,5л	\N
3081a7de-21bd-4ccd-960e-80a574dd69eb	Sauza gold	sauzagold07	3899	4726f1d3-9f05-4568-a24f-b2fc23b56619	\N	Мексика	\N		38%	\N	Стекло	0,7Л	\N
a7d6cf0a-51e7-4894-8557-9aa3995207ff	Jägermeister 	jager07	3799	cccf7ea8-e25e-47df-aa9c-5c10c52a7304	4099	Германия	\N	\N	35%	\N	Стекло	0.7л	\N
4461d024-0584-4767-9871-47f5436c2013	Baileys	beylis07	2599	cccf7ea8-e25e-47df-aa9c-5c10c52a7304	\N	Ирландия	\N	\N	17 %	\N	Стекло	0.7л	Lamonica
ddc39aac-3341-45ea-8323-847a62d8aad0	Olmeca silver	olmeka07	3499	4726f1d3-9f05-4568-a24f-b2fc23b56619	3799	Мексика	\N		38%	\N	Стекло	0,7Л	\N
b45553a6-49fd-4644-b0bf-d167ca7eb625	Beefeater	bifiter07	3499	620c2066-8a39-491d-a86e-8f4568dd636a	\N	Великобритания	\N	\N	47%	\N	Стекло	0,7л	\N
47ad6dad-8fcd-43c8-870c-83e9d8c823b3	Havana Club	havana07	2599	cca2137e-695d-4853-89a0-27c6a3167ffd	2899	Куба	\N	\N	37,5 %	\N	Стекло	0,7л	\N
fe983104-296d-4ec0-ab82-1d3512ecec38	Gordon's Gin	gordons07	2999	620c2066-8a39-491d-a86e-8f4568dd636a	\N	Великобритания	\N	\N	43%	\N	Стекло	0,7л	\N
67f769e7-c629-448a-bc3d-a3b7fd66afb4	Bacardi Blanca	bacardi07	2899	cca2137e-695d-4853-89a0-27c6a3167ffd	\N	США	\N		40%	\N	Стекло	0,7л	\N
d16d0631-616c-43a3-8884-ece0d0b8b8dc	Bacardi Blanca	bacardi05	2399	cca2137e-695d-4853-89a0-27c6a3167ffd	\N	США	\N		40%	\N	Стекло	0,5л	\N
742588f2-4514-4aac-8fb7-f5e10f325e4b	Rebarelle красное	rebarelkrsux	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Франция	\N	Сухое	11%	\N	Стекло	0,7л	\N
dc827b63-f7df-433f-b76b-b7402c027195	Firmamento белое	firmamentobelsux	1199	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Испания	\N	Сухое	12%	\N	Стекло	0,7л	\N
bfc239e9-048a-4b82-b07b-8638f01126e9	Rebarelle белое	rebarelbelsux	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Франция	\N	Сухое	11%	\N	Стекло	0,7л	\N
d398675a-efda-40fd-976d-3a67a2742e2d	Firmamento белое	firmamentobelplsi	1199	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Испания	\N	Полусладкое	12%	\N	Стекло	0,7л	\N
beb1e847-2ada-403b-aca5-0a89ff4ba525	Вода Боржоми	borjomi05	159	f52cf384-16de-4b61-9427-1947c5ef7a23	\N	Грузия	Вода	\N	\N	Газированная	Стекло	0,5Л	\N
6acafb65-454b-414a-9069-860aa6e145db	Вода Минеральная	aquasgazom	99	f52cf384-16de-4b61-9427-1947c5ef7a23	\N	Россия	Вода	\N	\N	Газированная	Пэт	0,5Л	\N
92c68a90-b343-4eba-8db8-3496dd2d52ff	Rich Томатный	tomat	239	e27792aa-9c19-49ec-a002-9a750f5b133e	\N	Россия	\N	Томатный			Крафтовый	1Л	\N
f2dd6b24-acf8-4856-b8c1-0bd664d51b55	Rich Мультифрукт	multifrukt	239	e27792aa-9c19-49ec-a002-9a750f5b133e	\N	Россия	\N	Мультифрукт			Крафтовый	1Л	\N
7c55c201-0dc8-4e62-b970-07e8dbe730da	Rich Вишня	cherry	239	e27792aa-9c19-49ec-a002-9a750f5b133e	\N	Россия	\N	Вишня			Крафтовый	1Л	\N
fbc634d6-de42-4337-ab5f-28f20f15ac93	Чипсы Lay's	laysluk	149	0502001e-cc9f-4402-abc7-038a454e1810	\N	США	Снеки	Лук	\N	\N	\N	80 гр	PepsiCo
de722e33-1173-4a9e-993d-d21f4f244bc9	Лыхны красное	lixni	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	1399	Абхазия	\N	Сухое	12%	\N	Стекло	0,7л	\N
e71867ae-8bdf-4679-8b2f-761568791517	Чипсы Lay's 	layskrab	149	0502001e-cc9f-4402-abc7-038a454e1810	\N	США	Снеки	Краб	\N	\N	\N	80 гр	PepsiCo
ebce06af-d0be-4932-a7e8-cedd756e1f9d	Сухарики 3 Корочки	trikorochkisir	59	0502001e-cc9f-4402-abc7-038a454e1810	\N	Россия	Снеки	Семга и сыр	\N	\N	\N	40 гр	PepsiCo
41c5fe2d-a8fd-4832-859a-4032ab579d36	Чипсы Lay's 	layssmetan	149	0502001e-cc9f-4402-abc7-038a454e1810	\N	США	Снеки	Сметана и лук	\N	\N	\N	80 гр	PepsiCo
0f31b142-ec46-492f-90ff-7d2ac26cfc5b	Winston Xstyle Silver	whinstonxsilver	290	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	4 мг	\N	\N	\N	Xstyle Silver
20f28376-43cf-4b12-967e-b5f851b79ac4	Колбаски	kolbasineostrie	189	0502001e-cc9f-4402-abc7-038a454e1810	\N	Россия	Снеки	Сырокопченые	\N	\N	\N	100 гр	PepsiCo
d9486f89-5a94-4d42-acff-125d0525c110	Vogue Menthe	vouge	310	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	 7 мг	\N	\N	\N	
47fc7b20-dc9e-47e4-931f-8a1a1d684c30	BeerKA	arexasorti	249	0502001e-cc9f-4402-abc7-038a454e1810	\N	Россия	Снеки	Фисташки с солью	\N	\N	\N	80 гр	PepsiCo
7186c9e3-198d-45b1-bf6c-025a049189b4	Winston blue	whinstonblue	290	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	6 мг	\N	\N	\N	
54da16bf-f670-4e54-8ea6-75ebd6a94990	Чипсы Lay's 	layscheese	149	0502001e-cc9f-4402-abc7-038a454e1810	\N	США	Снеки	Сыр	\N	\N	\N	80 гр	PepsiCo
44b51816-9b32-4525-bae9-8fe47c8adc5d	Parliament Aqua Blue	parliament	350	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	5 мг	\N	\N	\N	Xstyle Silver
e18f31e3-aa06-454d-b97e-1c1d20a5d3dd	Marlboro with button	marlborobutton	270	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	9 мг	\N	\N	\N	
041809f4-f3b3-4a6e-9e05-84a849870b4a	Marlboro red	marlborored	290	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	9 мг	\N	\N	\N	
7994b5c8-abaf-402b-9267-d1bbfb28611f	Kent 4	kent4	290	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	4 мг	\N	\N	\N	
184c0331-ecb3-4b2b-9f14-d4dc6cb4f971	Kent Nano	kentnano4	300	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	4 мг	\N	\N	\N	
74f90cc5-d6bb-43b9-87b5-79a5b9dd4d8d	Esse blue	esseblue	290	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Южная Корея	\N	\N	5 мг	\N	\N	\N	
3e0f85cb-4927-4fda-8898-296b8876e108	Chapman yellow	chapmangold	310	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	6 мг	\N	\N	\N	
42980feb-0050-463e-90d3-6f17fbd3d73b	Chapman red	chapmanred	310	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	6 мг	\N	\N	\N	
711b85fc-fa37-4060-a970-ce6dd96452bc	Chapman brown	chapmanbrown	310	1761cb87-095d-400a-bb88-ef2af0fbe872	\N	Россия	\N	\N	6 мг	\N	\N	\N	
cf5476ed-42b5-4799-844c-f6da722e8ee8	HEETS Синие	heetsblue	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Холод ментола	Легкие	\N	\N	\N	HEETS
db5d7e27-0b53-4423-8e8a-88a1b81f9274	HEETS Золото	heetsgold	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Древесные и ореховые нотки	Средние	\N	\N	\N	HEETS
3541d1b1-d19b-421f-8c02-9517aa855a63	HEETS Зеленые	heetsgreen	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Освежающий ментол	Легкие	\N	\N	\N	HEETS
8150a9f7-0b78-4410-99ec-22c8dbf3b06b	HEETS Голубые	heetstourqoise	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Бархатистый табачный бленд	Легкие	\N	\N	\N	HEETS
9be04172-6fc1-48fa-91d8-61922d4e08bf	Зажигалка Cricket	cricket	139	0aeebff6-247d-4445-b8fd-53548a097aca	\N	Швецария	Презервативы	Без вкуса	\N	\N	\N	1 шт	Cricket
989d21b2-45bf-47ee-9583-2c6fa6c4b192	Жвачка Orbit	orbit	99	0aeebff6-247d-4445-b8fd-53548a097aca	\N	США		Ассорти	\N	\N	\N	1 шт	
f70cce59-f141-4445-8929-d16bee71633d	Од.Стакан	cup	150	0aeebff6-247d-4445-b8fd-53548a097aca	\N	Россия			\N	\N	\N	0,2л - 10 шт	
ff8e0412-3c8a-4333-b013-eb1255a34400	Киндзмараули красное	kindzmarauli	1049	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Грузия	\N	Полусладкое	11,5%	\N	Стекло	0,7л	\N
dfec5f1f-ce64-46ca-94f0-2ff9c2841c4b	Апсны красное	apsni	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	1399	Абхазия	\N	Полусладкое	11%	\N	Стекло	0,7л	\N
5c183b93-cf02-4041-93b1-797705e5e84a	Pinot Grigio белое	pinogridjo	1399	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Италия	\N	Сухое	12%	\N	Стекло	0,7л	\N
b85073b0-1b40-4686-98ab-e044f5a13358	Santucci Toscana 	santtoskkrsux	1699	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Италия	\N	Кр/Сухое	12%	\N	Стекло	0,7л	\N
16afc7ed-47f2-455a-b6ea-7c44a682543d	Firmamento красное	firmamentokrsux	1199	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Испания	\N	Сухое	12%	\N	Стекло	0,7л	\N
7a731f67-7323-406a-af1e-521bb195a12f	Firmamento красное	firmamentokrpls	1199	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Испания	\N	Полусладкое	12%	\N	Стекло	0,7л	\N
65ef7ac1-cfae-4b29-8348-c7d1d89f22bc	Campo delia белое	kampodeliabelsux	1399	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Испания	\N	Сухое	12%	\N	Стекло	0,7л	\N
c05a8e9f-c64c-4951-80a8-a687bc4da2d5	Абрау-Дюрсо белое	abraudursobelpls	849	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Россия	\N	Полусладкое	12.5%	\N	Стекло	0,75л	\N
96d7cc45-15a7-4491-aa70-113fd2372ff2	Mondoro Asti	mondoroasti	2049	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Италия	\N	Полусладкое	7,5%	\N	Стекло	0,75л	\N
f75c27bf-7fd6-4da0-a6ee-9ce01de1ecc7	Cinzano Prosecco	cinzanoproseko	1949	890b9f91-bbba-4ffa-9c83-702905f41cd6	2249	Италия	\N	Prosecco	11%	\N	Стекло	0,75л	\N
36bfa74b-a2b4-4ecb-beb0-88051572f6be	Atto Primo Prosecco	attoprimoprosekko	1749	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Италия	\N	Prosecco	11.5%	\N	Стекло	0,75л	\N
2464d018-4b01-49a0-92e5-c53996aa8afa	Martini Extra	martiniekstradray	2399	7a04ec1c-8c89-4882-95e4-2f8cb32825b0	\N	Италия	\N		15%	\N	Стекло	1,0Л	\N
8deeb8a6-0fe2-401d-bc2b-61b207349a59	Atto Primo Asti	attoprimoasti	1749	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Италия	\N	Полусладкое	7.5%	\N	Стекло	0,75л	\N
cc933519-d507-4d23-b0ab-dd875ab8523b	Gancia Prosecco	ganchaprosekko	1699	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Италия	\N	Prosecco	9%	\N	Стекло	0,75л	\N
8955aba0-ca18-485a-8eb7-bae966ce34a4	Martini Bianco	martinibyanko	2399	7a04ec1c-8c89-4882-95e4-2f8cb32825b0	\N	Италия	\N		15%	\N	Стекло	1,0Л	\N
7bd6c21e-a733-48e7-95bb-88c16c875dba	Martini Bianco	martinibyanko	1349	7a04ec1c-8c89-4882-95e4-2f8cb32825b0	\N	Италия	\N		15%	\N	Стекло	0,5Л	\N
d9b6faa2-36d6-4ea7-84b8-802b4dfac803	Cinzano	chinzanobyanko	1499	7a04ec1c-8c89-4882-95e4-2f8cb32825b0	\N	Италия	\N		18%	\N	Стекло	1,0Л	\N
8212b885-3a83-48c1-9ab0-01cb755ee08d	Cinzano	chinzanobyanko	849	7a04ec1c-8c89-4882-95e4-2f8cb32825b0	\N	Италия	\N		18%	\N	Стекло	0,5Л	\N
21e873e5-1afc-4f89-b8bb-147ef0b14150	Царская	carskaya07	1149	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0.7 л	ООО «ЛАДОГА»
8b72d9ae-426b-4384-a977-33ccc1d4ae57	Хорта	xorta07	999	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.7 л	ООО «Русский Север»
2ccbc847-c94e-4686-95ba-b3dcfa941178	Финляндия	finland07	2199	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0.7 л	ООО «БИГ»
4b1cac78-21de-4864-a9e6-1171b60d6d20	Русский Стандарт	russstandart07	1149	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.7 л	ООО «Русский Стандарт Водка»
4d28a8e1-3796-444d-aa89-775caf535e8d	Пять Озер	pyatozer07	999	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.7 л	ООО «Алкогольная Сибирская Группа»
5018f7a4-8d54-4f96-8739-de7518cbd616	Зеленая марка	zelenayamarka07	949	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.7 л	АО «ЛВЗ «Топаз»
49e4febb-5848-4e25-99df-7b8b95f5a4df	Журавли	juravli	649	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0.5 л	АО «ЛВЗ «Топаз»
e199f827-ebdb-4065-b500-9aebcd9dfbf2	Беленькая	6414_991516_09.jpg	649	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Альфа спирт	\N	40%	\N	Стекло	0.5 л	ГК «Синергия»»
24ef78e6-f20e-4c55-bd86-93d5427e512c	Hoegaarden	hugarden	169	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Бельгия	\N	\N	4,6%	\N	стекло	0,45л	\N
d3de43b7-25bf-4f8f-a50c-6dab5e25b5df	Bud	bud	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Бельгия	\N	\N	4,8%	\N	ж/б	0,45л	\N
2bd1a619-9b97-4cd5-bfde-98323e06012d	William Lawson''s 	william07	2099	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,7л	\N
7cdbb4bb-cab8-4c40-a61f-ed41e56984d6	Macallan 	makalan07	10499	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,7л	\N
63036c5d-efc5-4b0d-9af6-e8bca8988784	Jim Beam 	jimbeam07	2999	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	США	\N	\N	43%	\N	Стекло	0,7л	\N
fa0f3f17-6bc9-4741-982a-f46ce8ad2a56	Jameson	jameson05	2899	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Ирландия	\N	\N	40%	\N	Стекло	0,5л	\N
d0dcb640-96bb-4472-b332-d08989aaaea0	Chivas Regal 12 	chivas12	5999	dfc6f7e4-3100-4963-8f60-571228e8db77	\N	Шотландия	\N	\N	40%	\N	Стекло	0,7л	\N
24373321-4c28-492e-a935-e2008f898c9c	Старейшина 3 года 	starshina305	1599	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Россия	\N	\N	40%	\N	Стекло	0,5л	\N
bf79385a-9039-4590-a4ec-e5954e4bfb54	Absolut	absolute05	1849	3497daf4-5971-4927-adde-92990381ba8e	\N	Швеция	Люкс спирт	\N	40%	\N	Стекло	0,5Л	Pernod Ricard
5034c6a6-b2d6-412d-98fd-b265393e28f9	Nemiroff медовая	nemiroffmedsper	649	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0,5Л	ООО "Объединенные пензенские водочные заводы"
e101d017-43c6-4ecd-bec9-f2da04d73854	Nemiroff классик	nemirofforig	649	3497daf4-5971-4927-adde-92990381ba8e	\N	Россия	Люкс спирт	\N	40%	\N	Стекло	0,5Л	ООО "Объединенные пензенские водочные заводы"
03463360-f0d1-4145-be74-2499e6c5d2f9	Арарат 3 года 	ararat305	1599	368db897-f92f-4a93-81df-fa67b92f2f0d	\N	Армения	\N	\N	40%	\N	Стекло	0,5л	\N
2e13901a-1b3b-48ab-82a9-2cf919e808bb	Sprite	sprite2	249	f52cf384-16de-4b61-9427-1947c5ef7a23	\N	Россия	Вода	\N	\N	Газированная	Пэт	2Л	The Coca-Cola Company
5c09b471-93c1-4db5-9fa5-5e1e9d8a6fd6	Tuborg 	tuborg	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Дания	\N	\N	4,6%	\N	ж/б	0,5л	\N
d4b0634a-5236-4385-a51a-72c46574429f	Козел светлая 	kozelsvet	139	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Дания		\N	4,6%	\N	ж/б	0,5л	\N
dbbb0ec5-69b7-4beb-b624-96ef6331a877	Kronenbourg 	kronenburg	169	0da7da58-7b26-4c0f-8986-528534271bf3	\N	Франция	\N	\N	4,8%	\N	ж/б	0,45л	\N
2473fd83-f127-4c7f-9d3f-fbba6712cabc	Evervess	tonnik1	249	f52cf384-16de-4b61-9427-1947c5ef7a23	\N	Россия	Вода	\N	\N	Газированная	Пэт	1Л	PepsiCo
3cd13de4-add3-470d-8833-7a291cba2a27	Rich Грейпфрут	greifrut	239	e27792aa-9c19-49ec-a002-9a750f5b133e	\N	Россия	\N	Грейпфрут			Крафтовый	1Л	\N
9d587edf-66eb-4d2d-be3e-f0cb0fb5d0df	Rich Яблоко	apple	239	e27792aa-9c19-49ec-a002-9a750f5b133e	\N	Россия	\N	Яблоко			Крафтовый	1Л	\N
206d8fc5-f49c-49e4-89a3-59fc934834fa	Чипсы Lay's  Рифленые	laysriflenie	149	0502001e-cc9f-4402-abc7-038a454e1810	\N	США	Снеки	Сметана и лук	\N	\N	\N	80 гр	PepsiCo
89cc6b44-c97d-4564-b57b-1e1408936dbb	Must Have	tabakmastxevasorii	749	abaa09aa-8e15-49d6-b540-db834c24a6eb	\N	Россия	\N	Ассорти	7 мг	\N	\N	25 гр	Must Have
6334316a-f8b7-46e5-8d40-b14ead04c540	Сыр копченый	sir	299	0502001e-cc9f-4402-abc7-038a454e1810	\N	Россия	Снеки	Сыр копченый	\N	\N	\N	100 гр	PepsiCo
9bf77a7e-8a33-4788-8f98-9141d1f04216	Сухарики 3 Корочки	trikorochkixolodec	59	0502001e-cc9f-4402-abc7-038a454e1810	\N	Россия	Снеки	Холодец с хреном	\N	\N	\N	40 гр	PepsiCo
c1aa7783-e766-4665-b5cc-27ca8fa494bd	Колбаски острые	kolbasineostrie	189	0502001e-cc9f-4402-abc7-038a454e1810	\N	Россия	Снеки	Сырокопченые	\N	\N	\N	100 гр	PepsiCo
d495a730-3a6d-4336-a353-ca464260c2de	 Darkside	bd74f83195461f902d32cc09f88fb422.jpg	749	abaa09aa-8e15-49d6-b540-db834c24a6eb	\N	Россия	\N	Ассорти	5-6 мг	\N	\N	30 гр	Darkside
6375b923-8f00-4d2c-a442-f525d76b2955	Darkside	darkside	749	abaa09aa-8e15-49d6-b540-db834c24a6eb	\N	Россия	\N	Ассорти	5-6 мг	\N	\N	25 гр	Darkside
6f126852-2665-4aea-8924-31357c0e14d6	Кальян	kalyan	7499	abaa09aa-8e15-49d6-b540-db834c24a6eb	\N	Россия	\N			\N	\N		
90fd5019-7d36-4718-b259-8c3de4aa5bcb	Blackburn	blackburn	749	abaa09aa-8e15-49d6-b540-db834c24a6eb	\N	Россия	\N	Ассорти	7 мг	\N	\N	25 гр	
ea75c66c-89d0-4f07-9207-7323179ff069	HEETS Фиолетовые	heetspurple	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Аромат лесных ягод	Легкие	\N	\N	\N	HEETS
04877f88-ce42-489e-9330-99f602d54d03	HEETS Оранжевые	heetsamber	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Древесные и ореховые нотки	Легкие	\N	\N	\N	HEETS
e8bd77b6-b71a-4fae-820d-16a5dbbebf8e	HEETS Желтые	heetsyellow	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	Цитрусовый аромат с пряными нотками	Легкие	\N	\N	\N	HEETS
b0cc16f0-04b5-4a9b-b989-26d8d627fcce	Lost Mary	202201251028329427_660X660.jpg	2599	65801616-dd4c-43cf-a0c3-ac3663a4e2f8	\N	Китай	Эл.Сигареты	Ассорти	20 мг	\N	\N	6000	\N
ad7c00e3-1142-4e0a-8cc4-daf09da5ece3	Штопор	shtapor	449	0aeebff6-247d-4445-b8fd-53548a097aca	\N	Россия			\N	\N	\N	1 шт	
0ba14d4b-62e4-42ac-8a59-2770804da050	Rich Апельсин	orange	239	e27792aa-9c19-49ec-a002-9a750f5b133e	\N	Россия	\N	Апельсин			Крафтовый	1Л	\N
fa36f7a1-597c-4fd1-8c91-d1aa4032dc06	Becherovka	d3a0c7772409810627c76ffede1efc8a.jpg	2649	cccf7ea8-e25e-47df-aa9c-5c10c52a7304	\N	Чехия	\N	\N	38 %	\N	Стекло	0,5Л	Lamonica
c3866f8a-4b59-4ab0-825f-7db2eef5c8e4	Абрау-Дюрсо Brut	abraudursobrut	849	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Россия	\N	Брют	12%	\N	Стекло	0,75л	\N
97de3d88-f591-4ca4-9abf-ade71b05be2a	Mondoro Brut	mondobrut	2049	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Италия	\N	Брют	7,5%	\N	Стекло	0,75л	\N
5ddbf603-a93f-4f35-816d-5b17509248d2	Вода Минеральная	aquabezgaz	99	f52cf384-16de-4b61-9427-1947c5ef7a23	\N	Россия	Вода	\N	\N	Негазированная	Пэт	0,5Л	PepsiCo
a1cb9709-906d-4841-880f-d01531d7d97f	HEETS Бронза	heetsbronze	300	9390861d-c276-4f9f-a381-df4c91b8b07c	\N	Россия	\N	С легкими нотами какао и сухофруктов	Легкие	\N	\N	\N	HEETS
cd1e3bdf-3981-421b-9726-078e7a3e62ef	Puffmi	199-seo-puffmi-vape.png	2499	65801616-dd4c-43cf-a0c3-ac3663a4e2f8	\N	Китай	Эл.Сигареты	Ассорти	20 мг	\N	\N	4500 	\N
b83dc2c2-4285-494f-9cf6-2c61b8a030d7	Inflave	photo_2022-12-13-14.48.40.jpg	2699	65801616-dd4c-43cf-a0c3-ac3663a4e2f8	\N	Китай	Эл.Сигареты	Ассорти	20 мг	\N	\N	5000	\N
65de2b48-7bb4-4691-a575-f3e6d917a8cf	Презервативы Сontex	condom	699	0aeebff6-247d-4445-b8fd-53548a097aca	\N	Тайланд	Презервативы	Без вкуса	\N	\N	\N	1 упк, 3 шт	Сontex
7af51d3a-5e7c-4a46-9247-ccae0586f597	Кока-кола	kola2	249	f52cf384-16de-4b61-9427-1947c5ef7a23	\N	Россия	Вода	\N	\N	Газированная	Пэт	2Л	\N
f5a7952e-18ca-4c59-b7d2-8b304cc40b01	Polini Самбука	sambuka05	1099	cccf7ea8-e25e-47df-aa9c-5c10c52a7304	\N	Италия	\N	\N	38%	\N	Стекло	0,5Л	Lamonica
7cf74afb-cb5a-4430-bd0c-b72490c494fd	Sauza silver	sauzasilver07	3599	4726f1d3-9f05-4568-a24f-b2fc23b56619	\N	Мексика	\N		51%	\N	Стекло	0,7Л	\N
b8b43b6d-5c07-43c9-9462-4512cdd61136	Captain Morgan	morgandrunk	2799	cca2137e-695d-4853-89a0-27c6a3167ffd	\N	Ямайка	\N	Пряный	35%	\N	Стекло	0,7л	\N
b7dce0bc-9a96-4027-94d5-0cc9527d117e	Алазанская долина красное	alazdalinakrpls	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Грузия	\N	Полусладкое	12%	\N	Стекло	0,7л	\N
7f62d29d-7133-4226-a389-eb4c4b344d62	Rebarelle белое	rebarelkrpls	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Франция	\N	Сухое	11%	\N	Стекло	0,7л	\N
983e8268-17d8-4daf-9463-0da1ce1d989c	Rebarelle белое	rebarelbelpls	1099	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Франция	\N	Полусладкое	11%	\N	Стекло	0,7л	\N
94dbe032-ddfb-4526-990b-9fdaff41a333	Matevosyan красное	matevosyankrsux	1249	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Армения	\N	Сухое	12%	\N	Стекло	0,7л	\N
e02bfde0-da42-4321-b866-f3e26c4c46ff	Chianti красное	kyanti	1399	18cffe6a-41b8-4c17-b5d7-e1f2f7b91e7c	\N	Кьянти	\N	Сухое	12%	\N	Стекло	0,7л	\N
b977d930-d6a9-4524-9bb9-dd5d7662e9bc	Российское белое	russian	449	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Россия	\N	Полусладкое	12.5%	\N	Стекло	0,75л	\N
e3516cc5-70ee-49fb-b599-6cf97d0be8f8	Bosca white	boskabelaya	899	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Литва	\N	Полусладкое	7,5%	\N	Стекло	0,75л	\N
9f003502-0d5d-467b-8028-179eb0859fab	Asti Martini	martiniasti	2149	890b9f91-bbba-4ffa-9c83-702905f41cd6	\N	Италия	\N	Полусладкое	7.5%	\N	Стекло	0,75л	\N
7a7511b7-4792-4261-ab92-c9b8e4ae4f19	Martini Fiero	martinifierro.jpg	1799	7a04ec1c-8c89-4882-95e4-2f8cb32825b0	2099	Италия	\N		15%	\N	Стекло	0,5л	\N
\.


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO db_expensive_grp;
GRANT ALL ON SCHEMA public TO db_admin;


--
-- Name: TABLE basket; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.basket TO db_admin WITH GRANT OPTION;
GRANT ALL ON TABLE public.basket TO db_expensive_grp WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

