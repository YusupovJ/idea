CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE,
  `password` varchar(255),
  `role` ENUM ('user', 'admin', 'moderator', 'deliver'),
  `refresh_token` text,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `phone` varchar(255)
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `desc_uz` text,
  `desc_ru` text,
  `desc_short_uz` text,
  `desc_short_ru` text,
  `count` integer,
  `views` integer,
  `orders` integer,
  `images` text,
  `price` integer,
  `discount` float,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `categories` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name_uz` varchar(255),
  `name_ru` varchar(255),
  `desc_uz` text,
  `desc_ru` text,
  `views` integer,
  `images` varchar(255),
  `parent_id` integer,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `favourites` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `product_id` integer
);

CREATE TABLE `events` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `cart` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` integer,
  `user_id` integer,
  `count` integer
);

CREATE TABLE `reviews` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `product_id` integer,
  `text` text,
  `rating` float,
  `image` text,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW(),
  `answer_to` integer
);

CREATE TABLE `address` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `name` varchar(255),
  `city` varchar(255),
  `region` varchar(255),
  `street` varchar(255),
  `house` varchar(255),
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `delivery` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `address_id` integer,
  `deliver_id` integer,
  `total_price` integer,
  `note` varchar(255),
  `delivery_fee` integer,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `orders` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_id` integer,
  `user_id` integer,
  `count` integer,
  `status` ENUM ('packing', 'on_the_way', 'finished'),
  `delivery_id` integer,
  `created_at` datetime DEFAULT NOW(),
  `updated_at` datetime DEFAULT NOW()
);

CREATE TABLE `attributes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name_uz` varchar(255),
  `name_ru` varchar(255)
);

CREATE TABLE `attribute_values` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `attribute_id` integer,
  `value_uz` varchar(255),
  `value_ru` varchar(255)
);

ALTER TABLE `categories` ADD FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`);

ALTER TABLE `favourites` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `favourites` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `cart` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `reviews` ADD FOREIGN KEY (`answer_to`) REFERENCES `reviews` (`id`);

ALTER TABLE `address` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `delivery` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

ALTER TABLE `delivery` ADD FOREIGN KEY (`deliver_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `orders` ADD FOREIGN KEY (`delivery_id`) REFERENCES `delivery` (`id`);

ALTER TABLE `attribute_values` ADD FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`);

CREATE TABLE `products_categories` (
  `products_id` integer,
  `categories_id` integer,
  PRIMARY KEY (`products_id`, `categories_id`)
);

ALTER TABLE `products_categories` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

ALTER TABLE `products_categories` ADD FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);


CREATE TABLE `events_products` (
  `events_id` integer,
  `products_id` integer,
  PRIMARY KEY (`events_id`, `products_id`)
);

ALTER TABLE `events_products` ADD FOREIGN KEY (`events_id`) REFERENCES `events` (`id`);

ALTER TABLE `events_products` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);


CREATE TABLE `attribute_values_products` (
  `attribute_values_id` integer,
  `products_id` integer,
  PRIMARY KEY (`attribute_values_id`, `products_id`)
);

ALTER TABLE `attribute_values_products` ADD FOREIGN KEY (`attribute_values_id`) REFERENCES `attribute_values` (`id`);

ALTER TABLE `attribute_values_products` ADD FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);


CREATE TABLE `attributes_categories` (
  `attributes_id` integer,
  `categories_id` integer,
  PRIMARY KEY (`attributes_id`, `categories_id`)
);

ALTER TABLE `attributes_categories` ADD FOREIGN KEY (`attributes_id`) REFERENCES `attributes` (`id`);

ALTER TABLE `attributes_categories` ADD FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

