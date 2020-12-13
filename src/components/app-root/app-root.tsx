import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {
  render() {

    return (
      <stencil-router historyType="hash">
        <header class="bg-dark">
          <div class="container p-2">
            <stencil-route-link activeClass="active" anchorClass="navbar-brand" url="/" exact={true}>
              <img src="https://unisc.br/images/unisc_transp.png" alt="logo" loading="lazy" />
            </stencil-route-link>
            <strong class="text-light d-none d-md-inline">Trabalho Análise Semantica - Compiladores - Profa. Dra. Andrea Konzen</strong>
          </div>
        </header>

        <nav class="navbar navbar-expand-md navbar-light bg-light">
          <div class="container">
            {/* <span class="navbar-brand"></span> */}
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <stencil-route-link activeClass="active" anchorClass="nav-link" url="/analise-preditiva" exact={true}>
                    Analise Preditiva
                  </stencil-route-link>
                </li>
                <li class="nav-item">
                  <stencil-route-link activeClass="active" anchorClass="nav-link" url="/precedencia-operadores" exact={true}>
                    Precedência de Operadores
                  </stencil-route-link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="container">
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="app-home" exact={true} />
            <stencil-route url="/analise-preditiva" component="analise-preditiva" exact={true} />
            <stencil-route url="/precedencia-operadores" component="analise-precedencia-operadores" exact={true} />
          </stencil-route-switch>
        </div>
        </stencil-router>
    );
  }
}
