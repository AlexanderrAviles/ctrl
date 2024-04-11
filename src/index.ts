import * as express from "express";
import * as dotenv from "dotenv";
import {AppDataSource} from "./data-source";
import {companyRouter} from "./routes/company.routes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", companyRouter);
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });