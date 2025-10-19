describe("API Challenger", () => {
  const username = `UserTeste${Date.now()}`;
  const password = "#Accenture12345";
  let accessToken = "";
  let userId = "";
  let booksList = [];

  it("Deve criar um usuário", () => {
    cy.request("POST", "/Account/v1/User", {
      userName: username,
      password: password,
    }).then((response) => {
      expect(response.status).to.eq(201);
      cy.log("API Response:", JSON.stringify(response.body));
      userId = response.body.userID;
      expect(response.body).to.have.property("userID").and.to.be.a("string");
      expect(response.body).to.have.property("username", username);
      expect(response.body).to.have.property("books").and.to.be.an("array");
    });
  });

  it("Deve Gerar um token de acesso", () => {
    cy.request("POST", "/Account/v1/GenerateToken", {
      userName: username,
      password: password,
    }).then((tokenResponse) => {
      expect(tokenResponse.status).to.eq(200);
      expect(tokenResponse.body)
        .to.have.property("token")
        .and.to.be.a("string");
      accessToken = tokenResponse.body.token;

      cy.log("accessToken:", accessToken);
    });
  });

  it("Deve Confirmar se o usuário criado está autorizado ", () => {
    cy.request("POST", "/Account/v1/Authorized", {
      userName: username,
      password: password,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.true;
      cy.log("API Response:", JSON.stringify(response.body));
    });
  });

  it("Deve Listar os livros disponíveis e salvar 2 isbns", () => {
    cy.request("GET", "/BookStore/v1/Books").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("books").and.to.be.an("array");

      response.body.books.slice(0, 2).forEach((book) => {
        booksList.push({ isbn: book.isbn });
      });

      cy.log("Saved ISBNs:", JSON.stringify(booksList));
      expect(booksList).to.have.lengthOf(2);
    });
  });

  it("Deve Deve Alugar dois livros de livre escolha", () => {
    cy.request({
      method: "POST",
      url: "/BookStore/v1/Books",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: {
        userId: userId,
        collectionOfIsbns: booksList,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("books");
      expect(response.body.books).to.be.an("array");
      cy.log("API Response:", JSON.stringify(response.body));
    });
  });

    it("Deve Listar os detalhes do usuário com os livros escolhidos", () => {
      cy.request({
        method: "GET",
        url: `/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("books").and.to.be.an("array");
        cy.log("API Response:", JSON.stringify(response.body));
      });
    });

    //bônus
    it("Deve Deletar o usuário cadastrado no início", () => {
      cy.request({
        method: "DELETE",
        url: `/Account/v1/User/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(204);
        cy.log("Usuário Deletado com sucesso!");
      });
    });

});


