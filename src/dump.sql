create database sistema_bancario;

create table users (
    id serial primary key,
    name text not null,
    email text unique not null,
    password text not null
);

create table categories (
    id serial primary key,
    description text not null
);

create table transactions (
    id serial primary key,
    description text,
    amount integer not null,
    date timestamp,
    category_id integer not null references categories(id),
    user_id integer not null references users(id),
    type text
);

insert into categories (description) values 
('Food'), ('Subscriptions and Services'), ('Home'), 
('Grocery'), ('Personal Care'), ('Education'),
('Family'), ('Leisure'), ('Pets'), ('Gifts'),
('Clothing'), ('Health'), ('Transportation'),
('Salary'), ('Sales'), ('Other Income'), ('Other Expenses');