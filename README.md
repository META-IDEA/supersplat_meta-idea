# SuperSplat - 3D Gaussian Splat Editor

| [SuperSplat Editor](https://playcanvas.com/supersplat/editor) | [User Guide](https://github.com/playcanvas/supersplat/wiki) | [Forum](https://forum.playcanvas.com/) | [Discord](https://discord.gg/RSaMRzg) |

SuperSplat is a free and open source tool for inspecting, editing, optimizing and publishing 3D Gaussian Splats. It is built on web technologies and runs in the browser, so there's nothing to download or install.

A live version of this tool is available at: https://playcanvas.com/supersplat/editor

![image](https://github.com/user-attachments/assets/b6cbb5cc-d3cc-4385-8c71-ab2807fd4fba)

To learn more about using SuperSplat, please refer to the [User Guide](https://github.com/playcanvas/supersplat/wiki).

## Local Development

To initialize a local development environment for SuperSplat, ensure you have [Node.js](https://nodejs.org/) 18+ installed. Then, in a terminal, do:

```sh
git clone https://github.com/playcanvas/supersplat.git
cd supersplat
npm i
npm run develop
```

The last command `npm run develop` will build SuperSplat and run a local server at `http://localhost:3000`. When changes to the source are detected, SuperSplat is automatically rebuilt - simply refresh your browser to see your changes.

When running your local build of SuperSplat in Chrome, we recommend you have the Developer Tools panel open. Also:

1. Visit the Network tab and check `Disable cache`.
2. Visit the Application tab, select `Service workers` on the left and then check `Update on reload` and `Bypass for network`. 

## Contributors

SuperSplat is made possible by our open source community:

<a href="https://github.com/playcanvas/supersplat/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=playcanvas/supersplat" />
</a>
