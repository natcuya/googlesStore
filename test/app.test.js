const app = require("../app");
const supertest = require("supertest");
const { expect } = require("chai");

describe('GET /apps', () => {
    it('should return an array of apps with no params', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          const app = res.body[0];
          expect(app).to.include.all.keys(
            'App', 'Category', 'Rating', 'Genres'
          );
        })
    });
	it("should sort array by name of app", () => {
		return supertest(app)
			.get("/apps")
			.query({ sort: "app" })
			.expect(200)
			.expect("Content-Type", /json/)
			.then((res) => {
				expect(res.body).to.be.an("array");
				let i = 0;
				let sorted = true;
				while (sorted && i < res.body.length - 1) {
					sorted = sorted && res.body[i].App.toLowerCase() < res.body[i + 1].App.toLowerCase();
					i++;
				}
				expect(sorted).to.be.true;
			});
	});
    it('should return an array of apps of selected genre', () => {
        return supertest(app)
          .get('/apps?genres=Arcade')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const app = res.body[0];
            expect(app).to.include.all.keys(
              'App', 'Category', 'Rating', 'Genres'
            );
          })
      });
    
    })