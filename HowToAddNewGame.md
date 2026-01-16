# How to Add a New Game

To add a new game, follow these steps:

1. **Create a New Folder**
   - In `src/GAME_DATA/`, create a new folder for your game.

2. **Add Game Assets**
   - Place your game assets in the newly created folder.
   - Update the scene data in `src/GAME_DATA/<your-game-id>/sceneData.ts`.

3. **Update `package.json` with a Start Script**
   - Add a start script for your game in `package.json`:
     ```json
     "start:<your-game-id>": "VITE_GAME_ID=<your-game-id> vite"
     ```

4. **Add a Deploy Script to `package.json`**
   - Include a deploy script in `package.json`:
     ```json
     "deploy:<your-game-id>": "VITE_GAME_ID=<your-game-id> npm run deployS3"
     ```

5. **Deploy Your Game**
   - Run the following command to deploy your game:
     ```bash
     npm run deploy:<your-game-id>
     ```

6. **Update CloudFront Distribution**
   - Ensure the CloudFront distribution includes the new game ID (as a path, e.g., `/<your-game-id>/*`).

7. **Modify CloudFront Function**
   - Update the CloudFront function to include the new game ID in the conditional check to forward requests correctly to the new game.
