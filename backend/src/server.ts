import express, { Request, Response } from "express";
import admin, { ServiceAccount } from "firebase-admin";
import { createConnection } from "typeorm";
import cors from "cors";
import noteRoutes from "./routes/noteRoutes";

import serviceAccount from "../fir-auth-sample-7f361-firebase-adminsdk-zn602-23ddf1f2ee.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

void createConnection().then((connection) => {
  const app = express();
  app.use(express.json());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cors(corsOptions));

  app.use("/api/v1/note", noteRoutes);

  app.get("/secret/userinfo", async (req: Request, res: Response) => {
    const idToken = req.header("Authorization");
    console.log(idToken);
    if (idToken) {
      const { uid } = await admin.auth().verifyIdToken(idToken);
      console.log(uid);

      res.json({ uid });
    }
    // Authorizationヘッダーが無ければ403
    res.status(403).send();
  });

  // app.get("/login", async (req: Request, res: Response) => {
  //   try {
  //     const User = userRepository.create({
  //       name: "namedayo",
  //       uid: "uiddayo",
  //     });
  //     const results = await userRepository.save(User);
  //     return res.json(results);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  const port = 1234;
  app.listen(port);
  console.log(`server started on: ${port}`);
});
