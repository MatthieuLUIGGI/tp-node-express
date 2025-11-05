import { describe, it, beforeEach, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";
import { store } from "../src/store/memory.store";

const app = createApp();

describe("Contacts API", () => {
    beforeEach(() => {
        store.clear();
    });

    it("GET / → 200", async () => {
        const res = await request(app).get("/");
        expect(res.status).toBe(200);
        expect(res.body.ok).toBe(true);
    });

    it("GET /contacts → []", async () => {
        const res = await request(app).get("/contacts");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("POST /contacts → 201, puis GET /contacts/1 → 200", async () => {
        const create = await request(app).post("/contacts").send({
            name: "Alice",
            email: "alice@example.com",
            phone: "+33 6 11 22 33 44"
        });
        expect(create.status).toBe(201);
        expect(create.body.id).toBe(1);

        const get = await request(app).get("/contacts/1");
        expect(get.status).toBe(200);
        expect(get.body.email).toBe("alice@example.com");
    });

    it("PUT /contacts/1 → 200 modif email", async () => {
        await request(app).post("/contacts").send({
            name: "Bob",
            email: "bob@old.com"
        });
        const put = await request(app).put("/contacts/1").send({
            name: "Bob",
            email: "bob@new.com",
            phone: ""
        });
        expect(put.status).toBe(200);
        expect(put.body.email).toBe("bob@new.com");
    });

    it("DELETE /contacts/1 → 200 puis GET 404", async () => {
        await request(app).post("/contacts").send({
            name: "Charlie",
            email: "charlie@example.com"
        });
        const del = await request(app).delete("/contacts/1");
        expect(del.status).toBe(200);

        const get = await request(app).get("/contacts/1");
        expect(get.status).toBe(404);
    });

    it("400: POST /contacts sans champs", async () => {
        const res = await request(app).post("/contacts").send({});
        expect(res.status).toBe(400);
    });

    it("400: JSON invalide", async () => {
        const res = await request(app)
            .post("/contacts")
            .set("Content-Type", "application/json")
            .send("{ invalid");
        expect(res.status).toBe(400);
    });

    it("404: GET /contacts/999", async () => {
        const res = await request(app).get("/contacts/999");
        expect(res.status).toBe(404);
    });

    it("405: PATCH /contacts (méthode interdite)", async () => {
        const res = await request(app).patch("/contacts");
        expect(res.status).toBe(405);
    });

    it("405: PATCH /contacts/1 (méthode interdite)", async () => {
        const res = await request(app).patch("/contacts/1");
        expect(res.status).toBe(405);
    });

    it("409: POST /contacts email en double", async () => {
        await request(app).post("/contacts").send({
            name: "Dup",
            email: "dup@example.com"
        });
        const res = await request(app).post("/contacts").send({
            name: "Dup2",
            email: "dup@example.com"
        });
        expect(res.status).toBe(409);
    });
});
