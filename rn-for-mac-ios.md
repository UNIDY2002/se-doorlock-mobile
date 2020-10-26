> 原文：[搭建开发环境](https://reactnative.cn/docs/getting-started)

> 部分下载安装的过程可能非常缓慢——这取决于你的网络环境。

## 安装依赖

必须安装的依赖有：Node、Watchman、Xcode 和 CocoaPods。

虽然你可以使用`任何编辑器`来开发应用（编写 js 代码），但你仍然必须安装 Xcode 来获得编译 iOS 应用所需的工具和环境。

### Node, Watchman

我们推荐使用[Homebrew](http://brew.sh/)来安装 Node 和 Watchman。在命令行中执行下列命令安装（如安装较慢可以尝试阿里云的镜像源 https://developer.aliyun.com/mirror/homebrew）：

```
brew install node
brew install watchman
```

如果你已经安装了 Node，请检查其版本是否在 v12 以上。安装完 Node 后建议设置 npm 镜像（淘宝源）以加速后面的过程（或使用科学上网工具）。

> 注意：不要使用 cnpm！cnpm 安装的模块路径比较奇怪，packager 不能正常识别！

```
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```

[Watchman](https://facebook.github.io/watchman)则是由 Facebook 提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager 可以快速捕捉文件的变化从而实现实时刷新）。

### Yarn

[Yarn](http://yarnpkg.com)是 Facebook 提供的替代 npm 的工具，可以加速 node 模块的下载。

```
npm install -g yarn
```

安装完 yarn 之后就可以用 yarn 代替 npm 了，例如用`yarn`代替`npm install`命令，用`yarn add 某第三方库名`代替`npm install 某第三方库名`。

### Xcode

React Native 目前需要[Xcode](https://developer.apple.com/xcode/downloads/) 10 或更高版本。你可以通过 App Store 或是到[Apple 开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装 Xcode IDE、Xcode 的命令行工具和 iOS 模拟器。

<h4>Xcode 的命令行工具</h4>

启动 Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`。Xcode 的命令行工具中包含一些必须的工具，比如`git`等。

<h4>CocoaPods</h4>

[CocoaPods](https://cocoapods.org/)是用 Ruby 编写的包管理器。从 0.60 版本开始 react native 的 iOS 版本需要使用 CocoaPods 来管理依赖。你可以使用下面的命令来安装 cocoapods。

> 当然安装可能也不顺利，请尝试使用代理软件或寻找一些国内可用的镜像源。

```sh
sudo gem install cocoapods
```

或者可以使用 brew 来安装

```sh
brew install cocoapods
```

> 另外目前最新版本似乎不能在 ruby2.6 版本以下安装，意味着如果你使用的 macOS 版本低于 10.15 (Catalina) 则无法直接安装。可以尝试安装较旧一些的版本。如`sudo gem install cocoapods -v 1.8.4`，参考 issue 链接 <https://github.com/CocoaPods/CocoaPods/issues/9568>

要了解更多信息，可以访问[CocoaPods 的官网](https://guides.cocoapods.org/using/getting-started.html)。

## 编译并运行 React Native 应用

安装完所有pod依赖后（`npx pod-install`），在你的项目目录中运行`yarn ios`：

```shell
cd YourProject
npx pod-install
yarn ios
```

此命令会对项目的原生部分进行编译，同时在另外一个命令行中启动`Metro`服务（也叫Packager）对js代码进行实时打包处理（类似webpack）。`Metro`服务也可以使用`yarn start`命令单独启动。

> 提示：如果此命令无法正常运行，请使用 Xcode 运行来查看具体错误（run-ios 的报错没有任何具体信息）。注意 0.60 版本之后的主项目文件是`.xcworkspace`，不是`.xcodeproj`！

很快就应该能看到 iOS 模拟器自动启动并运行你的项目。

在正常编译完成后，开发期间请保持`Metro`命令行窗口运行而不要关闭。以后需要再次运行项目时，如果没有修改过ios目录中的任何文件，则只需单独启动`yarn start`命令。如果对ios目录中任何文件有修改，则需要再次运行`yarn ios`命令完成原生部分的编译。

`yarn ios`只是运行应用的方式之一。你也可以在 Xcode 中直接运行应用。注意 0.60 版本之后的主项目文件是`.xcworkspace`，不是`.xcodeproj`。

> 如果你无法正常运行，先回头`仔细对照文档检查`，然后可以看看[讨论区](https://github.com/reactnativecn/react-native-website/issues)。

### 在真机上运行

上面的命令会自动在 iOS 模拟器上运行应用，如果你想在真机上运行，则请阅读[在设备上运行](https://reactnative.cn/docs/running-on-device)这篇文档。
