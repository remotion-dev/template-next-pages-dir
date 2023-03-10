// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: The configuration file does only apply if you render via the CLI !

import { Config } from "remotion";
import { webpackOverride } from "./webpack-override";

Config.setImageFormat("jpeg");
Config.overrideWebpackConfig(webpackOverride);
