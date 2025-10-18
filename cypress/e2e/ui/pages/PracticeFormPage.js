export class PracticeFormPage { 
  elements = {
    formsMenu: () => cy.contains("h5", "Forms"),
    practiceFormMenuItem: () => cy.contains("span.text", "Practice Form"),
    firstNameInput: () => cy.get("#firstName"),
    lastNameInput: () => cy.get("#lastName"),
    emailInput: () => cy.get("#userEmail"),
    genderRadio: (gender) => cy.contains("label", gender),
    mobileNumberInput: () => cy.get("#userNumber"),
    dateOfBirthInput: () => cy.get("#dateOfBirthInput"),
    datePickerMonth: () => cy.get(".react-datepicker__month-select"),
    datePickerYear: () => cy.get(".react-datepicker__year-select"),
    datePickerDay: (day) => cy.get(`.react-datepicker__day--${day}`),
    subjectsInput: () => cy.get("#subjectsInput"),
    hobbiesCheckbox: (hobby) => cy.contains("label", hobby),
    uploadPicture: () => cy.get("#uploadPicture"),
    addressInput: () => cy.get("#currentAddress"),
    stateDropdown: () => cy.get("#state"),
    stateOption: (state) => cy.contains("div", state),
    cityDropdown: () => cy.get("#city"),
    cityOption: (city) => cy.contains("div", city),
    submitButton: () => cy.get("#submit"),
    modalTitle: () => cy.get(".modal-title"),
    modalTableValue: (label) => cy.get("td").contains(label).next(),
    closeModalButton: () => cy.get("#closeLargeModal"),
  };

  visit() {
    cy.visit("https://demoqa.com/");
  }

  navigateToPracticeForm() {
    this.elements.formsMenu().click();
    this.elements.practiceFormMenuItem().click();
  }

  fillFirstName(name) {
    this.elements.firstNameInput().type(name);
  }

  fillLastName(name) {
    this.elements.lastNameInput().type(name);
  }

  fillEmail(email) {
    this.elements.emailInput().type(email);
  }

  selectGender(gender) {
    this.elements.genderRadio(gender).click();
  }

  fillMobileNumber(number) {
    this.elements.mobileNumberInput().type(number);
  }

  selectDateOfBirth(day, month, year) {
    this.elements.dateOfBirthInput().click();
    this.elements.datePickerMonth().select(month);
    this.elements.datePickerYear().select(year);
    this.elements.datePickerDay(day.padStart(3, "0")).first().click();
  }

  fillSubjects(subject) {
    this.elements.subjectsInput().type(`${subject}{enter}`);
  }

  selectHobbies(hobbies = []) {
    hobbies.forEach((hobby) => {
      this.elements.hobbiesCheckbox(hobby).click();
    });
  }

  uploadPicture(filePath) {
    this.elements.uploadPicture().selectFile(filePath);
  }

  fillAddress(address) {
    this.elements.addressInput().type(address);
  }

  selectStateAndCity(state, city) {
    this.elements.stateDropdown().click();
    this.elements.stateOption(state).click();
    this.elements.cityDropdown().click();
    this.elements.cityOption(city).click();
  }

  submitForm() {
    this.elements.submitButton().click();
  }

  verifyModalTitle(expectedText) {
    this.elements.modalTitle().should("have.text", expectedText);
  }

  verifyModalContent(label, expectedValue) {
    this.elements.modalTableValue(label).should("have.text", expectedValue);
  }

  closeModal() {
    this.elements.closeModalButton().click({force: true});
  }
}
