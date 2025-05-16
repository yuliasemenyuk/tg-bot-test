import dotenv from 'dotenv';
import { config } from "./config/config";

dotenv.config()

import app from "./app";

app.listen(config.get('port'), () => {
  console.log(`Server is running on port ${config.get('port')}`);
  //worker for processing messages
});


