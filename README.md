# kanji-vue

Aprende Kanji con Vue.

[Enlace a la aplicación](https://ijaureguialzo.github.io/kanji-vue/) desplegada en GitHub Pages.

## Prerrequisitos

1. Instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. En Windows, instalar [Scoop](https://scoop.sh) usando PowerShell:

    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
    ```

   Y después instalar los comandos necesarios:

    ```powershell
    scoop install make
    ```

## Puesta en marcha

1. Construir el contenedor donde se ejecuta la aplicación:

    ```shell
    make build
    ```

2. Instalar las dependencias de Node.js:

    ```shell
    make install
    ```

3. Arrancar el contenedor:

    ```shell
    make start
    ```

4. Acceder a [kanji-vue](http://localhost:5173).

## Referencias

- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/)
- [Bootstrap: Centering Elements Vertically and Horizontally](https://stackoverflow.com/a/44801382)
- [How do you disable viewport zooming on Mobile Safari?](https://stackoverflow.com/a/62165035)
- [Vue js with GitHub Actions: A Comprehensive Tutorial](https://www.bacancytechnology.com/blog/vue-js-with-github-actions)
- [Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html)
- [Pinia - Setup Stores](https://pinia.vuejs.org/core-concepts/#Setup-Stores)
