import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.js";
import leasesRouter from "./routes/leases.js";
import teneesRouter from "./routes/tenees.js";
import favoritesLeasesRouter from "./routes/favorites_leases.js";
import favoritesTeneesRouter from "./routes/favorites_tenees.js";

import passport from "passport";
import session from "express-session";
import { GitHub } from "./config/auth.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(
    session({
        secret: "sq7taigbtwo2brby",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(GitHub);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => {
    res.redirect("http://127.0.0.1:5173");
});

// Auth Routes
app.use("/auth", authRoutes);

// API Routes
app.use("/api/users", usersRouter);
app.use("/api/leases", leasesRouter);
app.use("/api/tenees", teneesRouter);
app.use("/api/favorites_leases", favoritesLeasesRouter);
app.use("/api/favorites_tenees", favoritesTeneesRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
