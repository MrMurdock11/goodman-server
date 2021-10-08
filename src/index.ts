import "core-js/stable";
import "regenerator-runtime/runtime";
import "dotenv-flow/config";
import chalk from "chalk";
import server from "./server";
import internalIp from "internal-ip";
import boxen from "boxen";

const HOSTNAME = "0.0.0.0";
const port: number = Number.parseInt(process.env.PORT ?? "1000", 10);

server.listen(port, HOSTNAME, async () => {
	console.log(
		boxen(
			chalk.green(
				"⚡ [server] is run!",
				"\n\nYou can access it with these addresses:",
				chalk.underline("\n\nLocal:"),
				chalk.magenta(`http://localhost:${port}/`),
				chalk.underline("\nOn your network:"),
				chalk.magenta(`http://${await internalIp.v4()}:${port}/`)
			),
			{
				padding: 1,
				margin: { top: 1, right: 0, bottom: 0, left: 4 },
				borderStyle: <any>"round",
			}
		)
	);
});
