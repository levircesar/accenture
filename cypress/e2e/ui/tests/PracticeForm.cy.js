import { PracticeFormPage } from "../pages/PracticeFormPage";

describe("Form Practice Test", () => {
  const formPage = new PracticeFormPage();
 
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    formPage.visit();
  });

  it("Deve preencher e submeter o formulário com sucesso", () => {
    const userData = {
      firstName: "levir",
      lastName: "lemos",
      email: "levirlemos@gmail.com",
      gender: "Male",
      mobile: "1234567891",
      dob: { day: "1", month: "January", year: "1999" },
      subjects: "Computer Science",
      hobbies: ["Sports", "Music"],
      address: "henrique ellery",
      state: "NCR",
      city: "Noida",
      picture: "cypress/e2e/assets/form.txt"
    };
 
    formPage.navigateToPracticeForm();
    formPage.fillFirstName(userData.firstName);
    formPage.fillLastName(userData.lastName);
    formPage.fillEmail(userData.email);
    formPage.selectGender(userData.gender);
    formPage.fillMobileNumber(userData.mobile);
    formPage.selectDateOfBirth(
      userData.dob.day,
      userData.dob.month,
      userData.dob.year
    );

    formPage.fillSubjects(userData.subjects);
    formPage.selectHobbies(userData.hobbies);
    formPage.uploadPicture(userData.picture);
    formPage.fillAddress(userData.address);
    formPage.selectStateAndCity(userData.state, userData.city);

    formPage.submitForm();

    formPage.verifyModalTitle("Thanks for submitting the form");
    formPage.verifyModalContent(
      "Student Name",
      `${userData.firstName} ${userData.lastName}`
    );

    formPage.closeModal();
    cy.screenshot();
  });
});
