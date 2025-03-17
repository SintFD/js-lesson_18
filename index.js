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
  #id;

  constructor(params) {
    this.#brand = params.brand;
    this.#model = params.model;
    this.#year = params.year;
    this.#pricePerDay = params.pricePerDay;
    this.#isAvailable = params.isAvailable;
    this.#id = params.id;
  }

  info() {
    return `Brand - ${this.#brand}, Model - ${this.#model}, Year - ${
      this.#year
    }, Price Per Day - ${this.#pricePerDay}$, Is Available - ${
      this.#isAvailable
    }, Vehicle ID: ${this.#id}`;
  }

  get id() {
    return this.#id;
  }

  get pricePerDay() {
    return this.#pricePerDay;
  }

  get isAvailable() {
    return this.#isAvailable;
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

  get id() {
    return this.#id;
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
  #id;

  constructor(params) {
    this.#customer = params.customer;
    this.#vehicle = params.vehicle;
    this.#startDate = params.startDate;
    this.#endDate = params.endDate;
    this.#id = params.id;
  }

  get id() {
    return this.#id;
  }

  get vehicle() {
    return this.#vehicle;
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
    return `${this.#customer.info()}, ${this.#vehicle.info()} , ${this.calculateTotalPrice()}, Rental ID: ${
      this.#id
    }`;
  }
}

class RentalService {
  vehicles = [];
  customers = [];
  rentals = [];
  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }
  addCustomer(customer) {
    this.customers.push(customer);
  }
  rentVehicle(customerId, vehicleId, startDate, endDate) {
    const newRent = new Rental({
      customer: this.customers.find((customer) => customer.id === customerId),
      vehicle: this.vehicles.find((vehicle) => {
        vehicle.markAsRented();
        return vehicle.id === vehicleId;
      }),
      startDate: startDate,
      endDate: endDate,
      id: Number(customerId + "" + vehicleId),
    });
    this.rentals.push(newRent);
  }
  listAvailableVehicles() {
    return this.vehicles
      .filter((vehicle) => vehicle.isAvailable)
      .map((vehicle) => vehicle.info());
  }
  listRentals() {
    return this.rentals.map((rental) => rental.info());
  }
  returnVehicle(rentalId) {
    this.rentals = this.rentals.filter((rental) => {
      if (rental.id === rentalId) {
        rental.vehicle.markAsAvailable();
        return false;
      }
      return true;
    });
  }
}

// -----------------Customers--------------------------------

const fred = new Customer({
  name: "fred",
  email: "fred@gmail.com",
  id: 256322,
});

const bob = new Customer({
  name: "bob",
  email: "bob@gmail.com",
  id: 1121211,
});

// -----------------Customers--------------------------------

// --------------------Vehicles--------------------------------

const toyota = new Car({
  brand: "toyota",
  model: "prius",
  year: 2011,
  pricePerDay: 60,
  isAvailable: true,
  id: 2312,
  seats: 5,
});

const kamaz = new Truck({
  brand: "Kamaz",
  model: "Big Boy",
  year: 2311,
  pricePerDay: 400,
  isAvailable: true,
  id: 788945,
  cargoCapacity: "5000 kg",
});

const bmw = new Car({
  brand: "bmw",
  model: "GT-45",
  year: 2045,
  pricePerDay: 100,
  isAvailable: true,
  id: 63452,
  seats: 4,
});

// ---------------------Vehicles--------------------------------

// ----------------------Service--------------------------------

const firstRentalService = new RentalService();

firstRentalService.addCustomer(fred);
firstRentalService.addCustomer(bob);

firstRentalService.addVehicle(bmw);
firstRentalService.addVehicle(kamaz);
firstRentalService.addVehicle(toyota);

firstRentalService.rentVehicle(
  1121211,
  63452,
  { year: 2024, month: 2, day: 24 },
  { year: 2024, month: 4, day: 11 }
);

firstRentalService.rentVehicle(
  256322,
  788945,
  { year: 2024, month: 3, day: 23 },
  { year: 2024, month: 6, day: 9 }
);

// console.log(firstRentalService.listRentals());
// firstRentalService.returnVehicle(256322788945);
// console.log(firstRentalService.listRentals());
// console.log(firstRentalService.listAvailableVehicles());
