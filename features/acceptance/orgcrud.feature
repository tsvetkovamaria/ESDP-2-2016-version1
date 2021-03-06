#language: ru

Функционал: Регистрация Организации
  @login
  Сценарий: Регистрация новой организации
    Допустим я на странице юзера "/organizations/new"
    И ввожу в поле "Name" текст "Organization1"
    И ввожу в поле "Location" текст "chuy"
#    И ввожу в поле "Longitude" текст "85.4"
#    И ввожу в поле "Latitude" текст "90.6"
    И ввожу в поле "Address" текст "asdf"
    И ввожу в поле "Location" текст "asfdasdf"
    И выбираю из списка "Детский дом" в поле "Organization category"
    И выбираю из списка "Баткенская область" в поле "Oblast"
    И кликаю на кнопку "Зарегистрировать"
    И должен увидеть текст "Привет"

  @logadmin
  Сценарий: Активация Организации
    Допустим я на странице админ "/admin/organizations"
    И кликаю через xpath1 "Edit" для "organization_8"
    И выбираю в радио батон "Yes" в поле "Active"
    И кликаю на кнопку "Update Organization"
    И должен увидеть текст "Organization was successfully updated"

   @login
   Сценарий: Проверка наличия организации в списке
     Допустим перехожу на "/organizations/list"
     И должен увидеть текст "Organization1"