import { Request, Response, Router } from "express";
import { login } from "../controllers/login";
import { authenticateToken } from "../middlewares/authenticateToken";
import { createProgram } from "../controllers/createProgram";
import { registerClient } from "../controllers/registerClient";
import { enrollClientToProgram } from "../controllers/enrollClientToProgram";
import { getAllClients } from "../controllers/getAllClients";
import { getClientProfile } from "../controllers/getClientProfile";
import { searchForClient } from "../controllers/searchForClient";

const router = Router()

router.post('/login', (req: Request, res: Response) => {
    (async () => {
        await login(req, res)
    })()
})


router.post(
  "/create-program",
  authenticateToken,
  (req: Request, res: Response) => {
    (async () => {
      await createProgram(req, res)
    })();
  }
);


router.post(
  "/register-client",
  authenticateToken,
  (req: Request, res: Response) => {
    (async () => {
      await registerClient(req, res)
    })();
  }
);


router.post(
  "/enroll-client-to-program",
  authenticateToken,
  (req: Request, res: Response) => {
    (async () => {
      await enrollClientToProgram(req, res)
    })();
  }
);


router.get(
  "/get-all-clients",
  authenticateToken,
  (req: Request, res: Response) => {
    (async () => {
      await getAllClients(req, res)
    })();
  }
);


router.post(
  "/search-for-client",
  authenticateToken,
  (req: Request, res: Response) => {
    (async () => {
      await searchForClient(req, res)
    })();
  }
);


router.get(
  "/client-profile/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    (async () => {
      await getClientProfile(req, res)
    })();
  }
);


export default router;