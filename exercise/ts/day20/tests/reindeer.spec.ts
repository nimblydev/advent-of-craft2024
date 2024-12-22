import { Server } from "node:http";
import { v4 as uuidv4 } from "uuid";
import { app } from "../src";
import { ReindeerColor } from "../src/types";
import { AddressInfo } from "net";

describe("Reindeer API", () => {
  let server: Server;
  let baseUrl: string;
  beforeAll((done) => {
    server = app.listen(() => {
      const { port } = server.address() as AddressInfo;
      baseUrl = `http://localhost:${port}`;
      console.log(`Server started at ${baseUrl}`);
      done();
    });
  });

  afterAll((done) => {
    server.closeAllConnections();
    server.close(() => {
      console.log("Server stopped");
      done();
    });
  });
  describe("when using a valid API key", () => {
    const VALID_API_KEY = "123e4567-e89b-12d3-a456-426614174000";
    it("should return an x-api-version header", async () => {
      const response = await fetch(
        `${baseUrl}/reindeer/40f9d24d-d3e0-4596-adc5-b4936ff84b19`
      );
      const apiVersion = response.headers.get("x-api-version");

      expect(apiVersion).toMatchSnapshot("api-version");
    });

    it("should get a reindeer", async () => {
      const response = await fetch(
        `${baseUrl}/reindeer/40f9d24d-d3e0-4596-adc5-b4936ff84b19`,
        {
          headers: { "X-API-Key": VALID_API_KEY },
        }
      );
      const responseBody = await response.json();
      expect(responseBody).toMatchSnapshot("get-reindeer");
      expect(response.status).toBe(200);
    });

    it("should return not found for non-existing reindeer", async () => {
      const nonExistingReindeer = uuidv4();
      const response = await fetch(
        `${baseUrl}/reindeer/${nonExistingReindeer}`,
        {
          headers: { "X-API-Key": VALID_API_KEY },
        }
      );

      expect(response.status).toBe(404);
    });

    it("should create a reindeer", async () => {
      const requestPayload = {
        name: "Rudolph",
        color: ReindeerColor.Purple,
      };
      const response = await fetch(`${baseUrl}/reindeer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": VALID_API_KEY,
        },
        body: JSON.stringify(requestPayload),
      });
      const responseBody = await response.json();

      expect(responseBody).toMatchSnapshot("create-reindeer");
      expect(response.status).toBe(201);
    });

    it("should return conflict when trying to create an existing reindeer", async () => {
      const requestPayload = {
        name: "Petar",
        color: ReindeerColor.Purple,
      };
      const response = await fetch(`${baseUrl}/reindeer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": VALID_API_KEY,
        },
        body: JSON.stringify(requestPayload),
      });

      expect(response.status).toBe(409);
    });
  });

  describe("when useing a invalid API key", () => {
    it("should return forbidden when trying to get a reindeer", async () => {
      const response = await fetch(
        `${baseUrl}/reindeer/40f9d24d-d3e0-4596-adc5-b4936ff84b19`,
        {
          headers: { "x-api-key": "invalid-api-key" },
        }
      );

      expect(response.status).toBe(403);
    });

    it("should return forbidden when trying to create a reindeer", async () => {
      const requestPayload = {
        name: "Rudolph",
        color: ReindeerColor.Purple,
      };
      const response = await fetch(`${baseUrl}/reindeer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "invalid-api-key",
        },
        body: JSON.stringify(requestPayload),
      });

      expect(response.status).toBe(403);
    });
  });
});
