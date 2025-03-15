// Магазин электроники
// Описание:
// Смоделируйте магазин электроники.

// Задание:

// Создайте базовый класс Product с закрытыми свойствами name, price, brand.
// Создайте наследников Phone и Laptop, добавив им уникальные свойства.
// Реализуйте метод get_discount_price() для расчета цены со скидкой. Переопределите его для разных типов товаров.
// Создайте класс Store, который хранит список продуктов и может выводить их список.

// class Product {
//   #name;
//   #price;
//   #brand;
//   #type;

//   constructor(params) {
//     this.#name = params.name;
//     this.#price = params.price;
//     this.#brand = params.brand;
//     this.#type = params.type;
//   }

//   info() {
//     console.log({ name: this.#name, price: this.#price, brand: this.#brand });
//   }
//   get_discount_price() {}

//   get price() {
//     return this.#price;
//   }
// }

// class Phone extends Product {
//   #camera;

//   constructor(params) {
//     super(params);
//     this.#camera = params.camera;
//   }

//   get_discount_price() {
//     return `Цена со скидкой ${this.price * 0.9}`;
//   }
// }
// class Laptop extends Product {
//   #keyboard;
//   constructor(params) {
//     super(params);
//     this.#keyboard = params.keyboard;
//   }

//   get_discount_price() {
//     return `Цена со скидкой ${this.price * 0.7}`;
//   }
// }

// const iphone = new Phone({
//   name: "iphone 12",
//   price: 1100,
//   brand: "apple",
//   camera: "48 mpx",
// });

// const asus = new Laptop({
//   name: "ROG strix",
//   price: 2800,
//   brand: "apple",
//   keyboard: "48 mpx",
// });

// class Store {
//   #products = [];

//   addProduct(newProduct) {
//     console.log("product success added");
//     this.#products.push(newProduct);
//   }
//   getProduct() {
//     this.#products.forEach((product) => {
//       product.info();
//     });
//   }
// }

// const fuadStore = new Store();

// fuadStore.addProduct(iphone);
// fuadStore.addProduct(asus);
// fuadStore.getProduct();

// _____________________________________________________________

// Система бронирования автомобилей
// Создайте систему для управления арендой автомобилей, которая включает управление клиентами, машинами и бронированиями.

// Условия задачи
// Класс Vehicle (базовый класс):

// Приватные свойства: brand, model, year, pricePerDay, isAvailable.
// Методы:
// info() — выводит информацию о транспортном средстве.
// markAsRented() и markAsAvailable() — изменяют доступность автомобиля.
// Подклассы Car и Truck:

// Добавьте уникальные свойства:
// Для Car — seats (количество мест).
// Для Truck — cargoCapacity (грузоподъемность).
// Переопределите метод info() для вывода дополнительной информации.
// Класс Customer:

// Приватные свойства: name, email, id.
// Метод info() — выводит информацию о клиенте.
// Класс Rental:

// Приватные свойства: customer, vehicle, startDate, endDate.
// Метод calculateTotalPrice() — рассчитывает стоимость аренды.
// Метод info() — выводит информацию о бронировании.
// Класс RentalService:

// Управляет списком доступных автомобилей, клиентов и бронирований.
// Методы:
// addVehicle(), addCustomer(), rentVehicle(customerId, vehicleId, startDate, endDate).
// listAvailableVehicles().
// listRentals() — выводит список активных бронирований.
// returnVehicle(rentalId) — завершает аренду, делает машину доступной.
// ⚙️ Требования
// Использовать инкапсуляцию для защиты данных.
// Реализовать наследование для Vehicle → Car/Truck.
// Использовать полиморфизм для переопределения метода info().
// Обеспечить корректную бизнес-логику: нельзя арендовать недоступный автомобиль, расчет цены по количеству дней.
// Для упрощения, использовать статические данные и массивы вместо базы данных.
// ✅ Примеры использования
// Создать несколько клиентов и автомобилей.
// Провести несколько бронирований.
// Посмотреть список активных бронирований и доступных машин.
// Завершить одно из бронирований и убедиться, что машина снова доступна.
// Рассчитать стоимость аренды для конкретного клиента.

class Vehicle {
  #brand;
  #model;
  #year;
  #pricePerDay;
  #isAvailable;

  constructor(params) {
    this.#brand = params.brand;
    this.#model = params.model;
    this.#year = params.year;
    this.#pricePerDay = params.pricePerDay;
    this.#isAvailable = params.isAvailable;
  }

  info() {
    return `Brand - ${this.#brand}, Model - ${this.#model}, Year - ${
      this.#year
    }, Price Per Day - ${this.#pricePerDay}, Is Available - ${
      this.#isAvailable
    }`;
  }

  markAsRented() {
    this.#isAvailable = false;
  }
  markAsAvailable() {
    this.#isAvailable = true;
  }
}

// const bmw = new Vehicle({
//   brand: "awd",
//   model: "asdkhh",
//   year: 2311,
//   pricePerDay: 566,
//   isAvailable: true,
// });

// console.log(bmw.info());

class Car extends Vehicle {
  seats;
  constructor(params) {
    super(params);
    this.seats = params.seats;
  }
  info() {
    return super.info() + ", Seats - " + this.seats;
  }
}

// const bmw = new Car({
//   brand: "toyota",
//   model: "prius",
//   year: 2011,
//   pricePerDay: 566,
//   isAvailable: true,
//   seats: 5,
// });

// console.log(bmw.info());

class Truck extends Vehicle {
  cargoCapacity;
  constructor(params) {
    super(params);
    this.cargoCapacity = params.cargoCapacity;
  }
  info() {
    return super.info() + ", Cargo Capacity - " + this.cargoCapacity;
  }
}

// const bmw = new Truck({
//   brand: "awd",
//   model: "asdkhh",
//   year: 2311,
//   pricePerDay: 566,
//   isAvailable: true,
//   cargoCapacity: "500 kg",
// });

// console.log(bmw.info());

class Customer {
  #name;
  #email;
  #id;

  constructor(params) {
    this.#name = params.name;
    this.#email = params.email;
    this.#id = params.id;
  }

  info() {
    return { name: this.#name, email: this.#email, id: this.#id };
  }
}

// const fred = new Customer({
//   name: "fred",
//   email: "fred@gmail.com",
//   id: "256322",
// });

// fred.info();

class Rental {
  #customer;
  #vehicle;
  #startDate;
  #endDate;

  constructor(params) {
    this.#customer = params.customer;
    this.#vehicle = params.vehicle;
    this.#startDate = params.startDate;
    this.#endDate = params.endDate;
  }

  calculateTotalPrice() {
    let diffTime =
      (new Date(
        this.#endDate.year,
        this.#endDate.month - 1,
        this.#endDate.day
      ) -
        new Date(
          this.#startDate.year,
          this.#startDate.month - 1,
          this.#startDate.day
        )) /
      (1000 * 60 * 60 * 24);
    console.log("End price: " + diffTime * this.#vehicle.info().pricePerDay);
  }
  info() {
    return { customer: this.#customer };
  }
}

class RentalService {
  addVehicle() {}
  addCustomer() {}
  rentVehicle(customerId, vehicleId, startDate, endDate) {}
  listAvailableVehicles() {}
  listRentals() {}
  returnVehicle(rentalId) {}
}
