# Dev Container

This project includes a repo-level development container config in [devcontainer.json](devcontainer.json).

## What this container includes

- Base image: Node.js 22 on Debian Bookworm
- VS Code extensions:
  - Prettier (`esbenp.prettier-vscode`)
  - Live Server (`ritwickdey.LiveServer`)
- Forwarded port: `5500` (useful for Live Server)
- Post-create check: prints the Node.js version

## How to rebuild the container

1. Open the Command Palette in VS Code.
2. Run: **Dev Containers: Rebuild Container**
3. Wait for the rebuild to complete and the window to reconnect.

If VS Code does not prompt automatically, run **Dev Containers: Reopen in Container** first.
