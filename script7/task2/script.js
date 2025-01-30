function dataModule() {
    let carList = [
      { carModel: "BMW", price: 1000 },
      { carModel: "BMW A600", price: 1500 },
      { carModel: "Audi A4", price: 1200 },
      { carModel: "Mercedes-Benz C-Class", price: 1800 },
      { carModel: "Tesla Model 3", price: 2500 },
      { carModel: "Ford Mustang", price: 2000 },
      { carModel: "Toyota Corolla", price: 900 },
      { carModel: "Honda Civic", price: 1100 },
    ];
    let currentCar;
  
    return {
      getAllCars() {
        return carList;
      },
      addCar(data) {
        carList.push(data);
      },
      removeCar(id) {
        carList.splice(id, 1);
      },
      setSelectedCar(id) {
        currentCar = id;
      },
      getSelectedCar() {
        return carList[currentCar];
      },
      calculateTotalPrice(days) {
        return carList[currentCar].price * days;
      },
    };
  }
  
  function uiModule() {
    return {
      displayCars(cars) {
        const list = document.getElementById("list");
        list.innerHTML = "";
        cars.forEach((car, id) => {
          list.innerHTML += `
            <div class="col">
              <div class="card mb-3" style="width: 18rem;">
                <div class="card-body text-center">
                  <h5 class="card-title">${car.carModel}</h5>
                  <p class="card-text">Price per Day: $${car.price}</p>
                  <button class="btn btn-primary book-btn" data-id="${id}">Book Now</button>
                </div>
              </div>
            </div>`;
        });
      },
      displayManageCars(cars) {
        const manageList = document.getElementById("car-mangeList");
        manageList.innerHTML = "";
        cars.forEach((car, id) => {
          manageList.innerHTML += `
            <div class="col">
              <div class="card mb-3" style="width: 18rem;">
                <div class="card-body text-center">
                  <h5 class="card-title">${car.carModel}</h5>
                  <p class="card-text">Price per Day: $${car.price}</p>
                  <button class="btn btn-danger remove-btn" data-id="${id}">Remove</button>
                </div>
              </div>
            </div>`;
        });
      },
      loadBookingForm(data) {
        document.getElementById("book-calModel").value = data.carModel;
        document.getElementById("book-price").value = data.price;
      },
      calculateTotalPrice(startDate, endDate, pricePerDay) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInDays = (end - start) / (1000 * 60 * 60 * 24);
        return diffInDays > 0 ? diffInDays * pricePerDay : 0;
      },
    };
  }
  
  const dataManager = dataModule();
  const uiManager = uiModule();
  
  // Initialize
  uiManager.displayCars(dataManager.getAllCars());
  uiManager.displayManageCars(dataManager.getAllCars());
  
  // Navigation
  const homePage = document.getElementById("homePage");
  const adminPage = document.getElementById("adminPage");
  const bookingPage = document.getElementById("BookingPage");
  
  document.getElementById("nav-home").addEventListener("click", () => {
    homePage.classList.remove("hide");
    adminPage.classList.add("hide");
    bookingPage.classList.add("hide");
  });
  
  document.getElementById("nav-admin").addEventListener("click", () => {
    homePage.classList.add("hide");
    adminPage.classList.remove("hide");
    bookingPage.classList.add("hide");
  });
  
  document.getElementById("nav-booking").addEventListener("click", () => {
    homePage.classList.add("hide");
    adminPage.classList.add("hide");
    bookingPage.classList.remove("hide");
  });
  
  // Add Car Form
  document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const model = document.getElementById("calModel").value;
    const price = document.getElementById("price").value;
  
    if (model && price) {
      dataManager.addCar({ carModel: model, price: parseFloat(price) });
      uiManager.displayManageCars(dataManager.getAllCars());
      document.getElementById("calModel").value = "";
      document.getElementById("price").value = "";
    }
  });
  
  // Manage Cars
  document.getElementById("car-mangeList").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const carId = e.target.getAttribute("data-id");
      dataManager.removeCar(carId);
      uiManager.displayManageCars(dataManager.getAllCars());
    }
  });
  
  // Book Now
  document.getElementById("list").addEventListener("click", (e) => {
    if (e.target.classList.contains("book-btn")) {
      const carId = e.target.getAttribute("data-id");
      dataManager.setSelectedCar(carId);
      uiManager.loadBookingForm(dataManager.getSelectedCar());
  
      homePage.classList.add("hide");
      adminPage.classList.add("hide");
      bookingPage.classList.remove("hide");
    }
  });
  
  // Calculate Total Price
  const startDateInput = document.getElementById("start-date");
  const endDateInput = document.getElementById("end-date");
  const totalPriceInput = document.getElementById("total-price");
  
  endDateInput.addEventListener("change", () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const selectedCar = dataManager.getSelectedCar();
    const total = uiManager.calculateTotalPrice(startDate, endDate, selectedCar.price);
    totalPriceInput.value = total > 0 ? `$${total}` : "Invalid Date Range";
  });
  
  // Confirm Booking
  document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (totalPriceInput.value && totalPriceInput.value !== "Invalid Date Range") {
      alert("Car successfully booked!");
    } else {
      alert("Please select a valid date range.");
    }
  });
  