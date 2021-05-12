PGDMP         *                y           bullet_journal    12.4    12.4 .    8           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            9           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            :           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ;           1262    32880    bullet_journal    DATABASE     ₧   CREATE DATABASE bullet_journal WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE bullet_journal;
                postgres    false            <           0    0    DATABASE bullet_journal    ACL     /   GRANT ALL ON DATABASE bullet_journal TO charg;
                   postgres    false    2875            ╤            1259    41220    days    TABLE     }   CREATE TABLE public.days (
    id integer NOT NULL,
    day date NOT NULL,
    mood integer,
    user_id integer NOT NULL
);
    DROP TABLE public.days;
       public         heap    postgres    false            ╨            1259    41218    days_id_seq    SEQUENCE     â   CREATE SEQUENCE public.days_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.days_id_seq;
       public          postgres    false    209            =           0    0    days_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.days_id_seq OWNED BY public.days.id;
          public          postgres    false    208            ═            1259    41186    friends    TABLE     ò   CREATE TABLE public.friends (
    id integer NOT NULL,
    pending boolean NOT NULL,
    user_id integer NOT NULL,
    friend_id integer NOT NULL
);
    DROP TABLE public.friends;
       public         heap    postgres    false            ╠            1259    41184    friends_id_seq    SEQUENCE     å   CREATE SEQUENCE public.friends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.friends_id_seq;
       public          postgres    false    205            >           0    0    friends_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.friends_id_seq OWNED BY public.friends.id;
          public          postgres    false    204            ╧            1259    41204    habits    TABLE     │   CREATE TABLE public.habits (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(2000) NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.habits;
       public         heap    postgres    false            ╬            1259    41202 
   habits_id_seq    SEQUENCE     à   CREATE SEQUENCE public.habits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.habits_id_seq;
       public          postgres    false    207            ?           0    0 
   habits_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.habits_id_seq OWNED BY public.habits.id;
          public          postgres    false    206            ╙            1259    41233    tasks    TABLE       CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    completed boolean NOT NULL,
    description character varying(2000) NOT NULL,
    due_date date,
    reminder date,
    user_id integer NOT NULL,
    day_id integer NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            ╥            1259    41231    tasks_id_seq    SEQUENCE     ä   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    211            @           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    210            ╦            1259    41178    users    TABLE     Θ   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(200) NOT NULL,
    fullname character varying(30) NOT NULL,
    email character varying(40) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ╩            1259    41176    users_id_seq    SEQUENCE     ä   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            A           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            £
           2604    41223    days id    DEFAULT     b   ALTER TABLE ONLY public.days ALTER COLUMN id SET DEFAULT nextval('public.days_id_seq'::regclass);
 6   ALTER TABLE public.days ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            Ü
           2604    41189 
   friends id    DEFAULT     h   ALTER TABLE ONLY public.friends ALTER COLUMN id SET DEFAULT nextval('public.friends_id_seq'::regclass);
 9   ALTER TABLE public.friends ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            ¢
           2604    41207 	   habits id    DEFAULT     f   ALTER TABLE ONLY public.habits ALTER COLUMN id SET DEFAULT nextval('public.habits_id_seq'::regclass);
 8   ALTER TABLE public.habits ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            ¥
           2604    41236    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            Ö
           2604    41181    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            3          0    41220    days 
   TABLE DATA           6   COPY public.days (id, day, mood, user_id) FROM stdin;
    public          postgres    false    209            /          0    41186    friends 
   TABLE DATA           B   COPY public.friends (id, pending, user_id, friend_id) FROM stdin;
    public          postgres    false    205            1          0    41204    habits 
   TABLE DATA           A   COPY public.habits (id, title, description, user_id) FROM stdin;
    public          postgres    false    207            5          0    41233    tasks 
   TABLE DATA           g   COPY public.tasks (id, title, completed, description, due_date, reminder, user_id, day_id) FROM stdin;
    public          postgres    false    211            -          0    41178    users 
   TABLE DATA           H   COPY public.users (id, username, password, fullname, email) FROM stdin;
    public          postgres    false    203            B           0    0    days_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.days_id_seq', 1, false);
          public          postgres    false    208            C           0    0    friends_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.friends_id_seq', 1, false);
          public          postgres    false    204            D           0    0 
   habits_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.habits_id_seq', 1, false);
          public          postgres    false    206            E           0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);
          public          postgres    false    210            F           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    202            Ñ
           2606    41225    days days_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.days DROP CONSTRAINT days_pkey;
       public            postgres    false    209            í
           2606    41191    friends friends_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_pkey;
       public            postgres    false    205            ú
           2606    41212    habits habits_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.habits
    ADD CONSTRAINT habits_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.habits DROP CONSTRAINT habits_pkey;
       public            postgres    false    207            º
           2606    41241    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    211            ƒ
           2606    41183    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            ½
           2606    41226    days days_user_id_fkey 
   FK CONSTRAINT     ç   ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.days DROP CONSTRAINT days_user_id_fkey;
       public          postgres    false    203    209    2719            ⌐
           2606    41197    friends friends_friend_id_fkey 
   FK CONSTRAINT     æ   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.users(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_friend_id_fkey;
       public          postgres    false    2719    205    203            ¿
           2606    41192    friends friends_user_id_fkey 
   FK CONSTRAINT     ì   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_user_id_fkey;
       public          postgres    false    203    2719    205            ¬
           2606    41213    habits habits_user_id_fkey 
   FK CONSTRAINT     ï   ALTER TABLE ONLY public.habits
    ADD CONSTRAINT habits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.habits DROP CONSTRAINT habits_user_id_fkey;
       public          postgres    false    207    203    2719            ¡
           2606    41247    tasks tasks_day_id_fkey 
   FK CONSTRAINT     å   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_day_id_fkey FOREIGN KEY (day_id) REFERENCES public.days(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_day_id_fkey;
       public          postgres    false    2725    211    209            ¼
           2606    41242    tasks tasks_user_id_fkey 
   FK CONSTRAINT     ë   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_user_id_fkey;
       public          postgres    false    211    2719    203            3   
   x£ï╤πΓΓ ┼ ⌐      /   
   x£ï╤πΓΓ ┼ ⌐      1   
   x£ï╤πΓΓ ┼ ⌐      5   
   x£ï╤πΓΓ ┼ ⌐      -   
   x£ï╤πΓΓ ┼ ⌐      .    8           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            9           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            :           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ;           1262    32880    bullet_journal    DATABASE     ₧   CREATE DATABASE bullet_journal WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE bullet_journal;
                postgres    false            <           0    0    DATABASE bullet_journal    ACL     /   GRANT ALL ON DATABASE bullet_journal TO charg;
                   postgres    false    2875            ╤            1259    41220    days    TABLE     }   CREATE TABLE public.days (
    id integer NOT NULL,
    day date NOT NULL,
    mood integer,
    user_id integer NOT NULL
);
    DROP TABLE public.days;
       public         heap    postgres    false            ╨            1259    41218    days_id_seq    SEQUENCE     â   CREATE SEQUENCE public.days_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.days_id_seq;
       public          postgres    false    209            =           0    0    days_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.days_id_seq OWNED BY public.days.id;
          public          postgres    false    208            ═            1259    41186    friends    TABLE     ò   CREATE TABLE public.friends (
    id integer NOT NULL,
    pending boolean NOT NULL,
    user_id integer NOT NULL,
    friend_id integer NOT NULL
);
    DROP TABLE public.friends;
       public         heap    postgres    false            ╠            1259    41184    friends_id_seq    SEQUENCE     å   CREATE SEQUENCE public.friends_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.friends_id_seq;
       public          postgres    false    205            >           0    0    friends_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.friends_id_seq OWNED BY public.friends.id;
          public          postgres    false    204            ╧            1259    41204    habits    TABLE     │   CREATE TABLE public.habits (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(2000) NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.habits;
       public         heap    postgres    false            ╬            1259    41202 
   habits_id_seq    SEQUENCE     à   CREATE SEQUENCE public.habits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.habits_id_seq;
       public          postgres    false    207            ?           0    0 
   habits_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.habits_id_seq OWNED BY public.habits.id;
          public          postgres    false    206            ╙            1259    41233    tasks    TABLE       CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    completed boolean NOT NULL,
    description character varying(2000) NOT NULL,
    due_date date,
    reminder date,
    user_id integer NOT NULL,
    day_id integer NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            ╥            1259    41231    tasks_id_seq    SEQUENCE     ä   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    211            @           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    210            ╦            1259    41178    users    TABLE     Θ   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(200) NOT NULL,
    fullname character varying(30) NOT NULL,
    email character varying(40) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ╩            1259    41176    users_id_seq    SEQUENCE     ä   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            A           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            £
           2604    41223    days id    DEFAULT     b   ALTER TABLE ONLY public.days ALTER COLUMN id SET DEFAULT nextval('public.days_id_seq'::regclass);
 6   ALTER TABLE public.days ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            Ü
           2604    41189 
   friends id    DEFAULT     h   ALTER TABLE ONLY public.friends ALTER COLUMN id SET DEFAULT nextval('public.friends_id_seq'::regclass);
 9   ALTER TABLE public.friends ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            ¢
           2604    41207 	   habits id    DEFAULT     f   ALTER TABLE ONLY public.habits ALTER COLUMN id SET DEFAULT nextval('public.habits_id_seq'::regclass);
 8   ALTER TABLE public.habits ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            ¥
           2604    41236    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            Ö
           2604    41181    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            3          0    41220    days 
   TABLE DATA           6   COPY public.days (id, day, mood, user_id) FROM stdin;
    public          postgres    false    209          /          0    41186    friends 
   TABLE DATA           B   COPY public.friends (id, pending, user_id, friend_id) FROM stdin;
    public          postgres    false    205   +       1          0    41204    habits 
   TABLE DATA           A   COPY public.habits (id, title, description, user_id) FROM stdin;
    public          postgres    false    207   H       5          0    41233    tasks 
   TABLE DATA           g   COPY public.tasks (id, title, completed, description, due_date, reminder, user_id, day_id) FROM stdin;
    public          postgres    false    211   e       -          0    41178    users 
   TABLE DATA           H   COPY public.users (id, username, password, fullname, email) FROM stdin;
    public          postgres    false    203   é       B           0    0    days_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.days_id_seq', 1, false);
          public          postgres    false    208            C           0    0    friends_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.friends_id_seq', 1, false);
          public          postgres    false    204            D           0    0 
   habits_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.habits_id_seq', 1, false);
          public          postgres    false    206            E           0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);
          public          postgres    false    210            F           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    202            Ñ
           2606    41225    days days_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.days DROP CONSTRAINT days_pkey;
       public            postgres    false    209            í
           2606    41191    friends friends_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_pkey;
       public            postgres    false    205            ú
           2606    41212    habits habits_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.habits
    ADD CONSTRAINT habits_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.habits DROP CONSTRAINT habits_pkey;
       public            postgres    false    207            º
           2606    41241    tasks tasks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pkey;
       public            postgres    false    211            ƒ
           2606    41183    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            ½
           2606    41226    days days_user_id_fkey 
   FK CONSTRAINT     ç   ALTER TABLE ONLY public.days
    ADD CONSTRAINT days_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY public.days DROP CONSTRAINT days_user_id_fkey;
       public          postgres    false    203    209    2719            ⌐
           2606    41197    friends friends_friend_id_fkey 
   FK CONSTRAINT     æ   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES public.users(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_friend_id_fkey;
       public          postgres    false    2719    205    203            ¿
           2606    41192    friends friends_user_id_fkey 
   FK CONSTRAINT     ì   ALTER TABLE ONLY public.friends
    ADD CONSTRAINT friends_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY public.friends DROP CONSTRAINT friends_user_id_fkey;
       public          postgres    false    203    2719    205            ¬
           2606    41213    habits habits_user_id_fkey 
   FK CONSTRAINT     ï   ALTER TABLE ONLY public.habits
    ADD CONSTRAINT habits_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.habits DROP CONSTRAINT habits_user_id_fkey;
       public          postgres    false    207    203    2719            ¡
           2606    41247    tasks tasks_day_id_fkey 
   FK CONSTRAINT     å   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_day_id_fkey FOREIGN KEY (day_id) REFERENCES public.days(id) ON DELETE CASCADE;
 A   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_day_id_fkey;
       public          postgres    false    2725    211    209            ¼
           2606    41242    tasks tasks_user_id_fkey 
   FK CONSTRAINT     ë   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_user_id_fkey;
       public          postgres    false    211    2719    203           
