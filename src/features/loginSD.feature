Feature: Login to Swag Labs

Background: 
 Given que estoy en la página de Swag Labs
    
  @login
  Scenario: Iniciar sesión con credenciales válidas
    When ingreso mis credenciales username "standard_user" y password "secret_sauce"
    Then el inicio de sesión es satisfactorio

  @login_invalido
  Scenario: Iniciar sesión con credenciales inválidas
    When ingreso mis credenciales username "standard_user" y password "secret_sauce1"
    Then el inicio de sesión es insatisfactorio

  @agregar_producto
  Scenario: Agregar un producto al carrito
    When ingreso mis credenciales username "standard_user" y password "secret_sauce"
    And agrego el producto "Sauce Labs Backpack" al carrito
    Then el producto se agrega correctamente al carrito

  @ver_carrito
  Scenario: El usuario puede ver los productos agregados en el carrito de compras
    When ingreso mis credenciales username "standard_user" y password "secret_sauce"
    And agrego el producto "Sauce Labs Backpack" al carrito
    And abro el carrito de compras
    Then el producto "Sauce Labs Backpack" aparece en el carrito

   @checkout
  Scenario: El usuario puede completar el proceso de compra hasta la confirmación
    When ingreso mis credenciales username "standard_user" y password "secret_sauce"
    And agrego el producto "Sauce Labs Backpack" al carrito
    And abro el carrito de compras
    And procedo al checkout
    And ingreso la información de envío: nombre "Juan", apellido "Pérez", código postal "12345"
    And finalizo la compra
    Then la compra se completa y se muestra el mensaje de confirmación