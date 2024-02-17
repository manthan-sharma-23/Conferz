import e, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

const router: Router = Router();

router
  .use(cors())
  .use(e.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(morgan(":method :url :status :res[content-length] - :response-time ms"));

export default router;
