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
    }, Price Per Day - ${this.#pricePerDay}$, Is Available - ${
      this.#isAvailable
    }`;
  }

  get pricePerDay() {
    return this.#pricePerDay;
  }

  markAsRented() {
    this.#isAvailable = false;
  }
  markAsAvailable() {
    this.#isAvailable = true;
  }
}

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
    return `Customer Name: ${this.#name}, Customer Email: ${
      this.#email
    }, Customer ID: ${this.#id}`;
  }
}

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
    return "End price: " + diffTime * this.#vehicle.pricePerDay;
  }
  info() {
    return `${this.#customer.info()}, ${this.#vehicle.info()} , ${this.calculateTotalPrice()}`;
  }
}

class RentalService {
  vehicles = [];
  customers = [];
  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }
  addCustomer(customer) {
    this.customers.push(customer);
  }
  rentVehicle(customerId, vehicleId, startDate, endDate) {}
  listAvailableVehicles() {}
  listRentals() {}
  returnVehicle(rentalId) {}
}

const firstRentalService = new RentalService();

const fred = new Customer({
  name: "fred",
  email: "fred@gmail.com",
  id: "256322",
});

const bob = new Customer({
  name: "bob",
  email: "bob@gmail.com",
  id: "1121211",
});

const toyota = new Car({
  brand: "toyota",
  model: "prius",
  year: 2011,
  pricePerDay: 60,
  isAvailable: true,
  seats: 5,
});

const kamaz = new Truck({
  brand: "awd",
  model: "asdkhh",
  year: 2311,
  pricePerDay: 400,
  isAvailable: true,
  cargoCapacity: "500 kg",
});

const bmw = new Car({
  brand: "bmw",
  model: "GT-45",
  year: 2045,
  pricePerDay: 100,
  isAvailable: true,
  seats: 4,
});

// const newRent = new Rental({
//   customer: fred,
//   vehicle: toyota,
//   startDate: { year: 2024, month: 2, day: 24 },
//   endDate: { year: 2024, month: 4, day: 11 },
// });

// console.log(newRent.info());
