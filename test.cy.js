/// <reference types ="Cypress"/>

describe('Деловой', () => {
    beforeEach(() => {
        // Реальзуем все на экране iphone xr
        cy.viewport('iphone-xr')
    })

    // Визит и проверка title
    it('тест 1 - Визит и проверка title', () => {
        cy.visit('cypress/public/index.html')
        cy.title().should('include', 'Деловой')
    })
    // Проверка контента
    it('тест 2 - Проверка контента', () => {
        cy.xpath("//div[@class='display-3 mb-lg-2 text-center']").contains('Деловой').should('be.visible')
        cy.get('div[class="empty-list__title"]').contains('Список дел пуст').should('be.visible')
        cy.get('div[class="card-header"]').contains('Добавить новую задачу').should('be.visible')
        cy.get('#taskInput').should('have.attr', 'placeholder', 'Новая задача')
        cy.get('button[type="submit"]').contains('Добавить').should('be.visible')
    })
    // Проверка добавлeние и удаление задач
    // Проверка способов ввода в название задач
    // Проверки окна "Список дел пуст"
    it('тест 3 - Функционал', () => {
        // Проверка, что изчезает окно "Список дел пуст" при добавление задач
        cy.screenshot('деловой/"список дел пуст" отображается')
        // Проверка добавление задач с буквами
        cy.get('#taskInput').type('Фыва')
        cy.get('button[type="submit"]').click()
        cy.get('.task-title').contains('Фыва').should('be.visible')
        cy.screenshot('деловой/"список дел пуст" пропал')
        // Проверка, что кнопоки done и delete отобразились
        cy.get('button[data-action="done"]').should('be.visible')
        cy.get('button[data-action="delete"]').should('be.visible')
        // Проверка добавление задач с цифрами
        cy.get('#taskInput').type('1234567890')
        cy.get('button[type="submit"]').click()
        cy.get('.task-title').contains('1234567890').should('be.visible')
        // Проверка, что кнопоки done и delete отобразились
        cy.get('button[data-action="done"]').should('be.visible')
        cy.get('button[data-action="delete"]').should('be.visible')
        // Проверка добавление задач с знаками
        cy.get('#taskInput').type('!@"№;%:?*()_+-{}[];?><,./;:')
        cy.get('button[type="submit"]').click()
        cy.get('.task-title').contains('!@"№;%:?*()_+-{}[];?><,./;:').should('be.visible')
        // Проверка, что кнопоки done и delete отобразились
        cy.get('button[data-action="done"]').should('be.visible')
        cy.get('button[data-action="delete"]').should('be.visible')
        // Проверка добавление задач со всем вместе
        cy.get('#taskInput').type('!@"№;%?><,./;:Фывсчммку1924')
        cy.get('button[type="submit"]').click()
        cy.get('.task-title').contains('!@"№;%?><,./;:Фывсчммку1924').should('be.visible')
        // Проверка, что кнопоки done и delete отобразились
        cy.get('button[data-action="done"]').should('be.visible')
        cy.get('button[data-action="delete"]').should('be.visible')
        // Проверка, как отображается задача, при нажатие на done(иконка с галкой) должен меняться класс задачи
        cy.get('span[class="task-title"]').contains('Фыва').should('have.class', 'task-title')
        cy.get('button[data-action="done"]').eq(0).focus().click()
        cy.get('span[class="task-title task-title--done"]').contains('Фыва').should('have.class', 'task-title task-title--done')
        cy.get('span[class="task-title"]').contains('1234567890').should('have.class', 'task-title')
        cy.get('button[data-action="done"]').eq(1).focus().click()
        cy.get('span[class="task-title task-title--done"]').contains('1234567890').should('have.class', 'task-title task-title--done')
        cy.get('span[class="task-title"]').contains('!@"№;%:?*()_+-{}[];?><,./;:').should('have.class', 'task-title')
        cy.get('button[data-action="done"]').eq(2).focus().click()
        cy.get('span[class="task-title task-title--done"]').contains('!@"№;%:?*()_+-{}[];?><,./;:').should('have.class', 'task-title task-title--done')
        cy.get('span[class="task-title"]').contains('!@"№;%?><,./;:Фывсчммку1924').should('have.class', 'task-title')
        cy.get('button[data-action="done"]').eq(3).focus().click()
        cy.get('span[class="task-title task-title--done"]').contains('!@"№;%?><,./;:Фывсчммку1924').should('have.class', 'task-title task-title--done')
        cy.screenshot('деловой/done - первый клик')
        // Проверка, как отображается задача, при нажатие на done(иконка с галкой) повторно
        cy.get('button[data-action="done"]').eq(0).focus().click()
        cy.get('button[data-action="done"]').eq(1).focus().click()
        cy.get('button[data-action="done"]').eq(2).focus().click()
        cy.get('button[data-action="done"]').eq(3).focus().click()
        cy.screenshot('деловой/done - повторный_клик')
        // Проверка, удаления задач, и появления элемента на странице "Список дел пуст"
        cy.get('button[data-action="delete"]').eq(0).focus().click()
        cy.get('button[data-action="delete"]').eq(0).focus().click()
        cy.get('button[data-action="delete"]').eq(0).focus().click()
        cy.get('button[data-action="delete"]').eq(0).focus().click()
        cy.get('div[class="empty-list__title"]').contains('Список дел пуст').should('be.visible')
        cy.screenshot('деловой/"список дел пуст" отображается после удаления всех задач')
    })
    // Иные проверки
    it('тест 4 - Иные проверки', () => {
        // Проверка нажатия кнопки "Добавить" с пустым полем ввода 
        cy.get('button[type="submit"]').focus().click()
        cy.screenshot('деловой/клик "добавить" с пустым полем ввода')
        // Проверка реализованности переноса текста в добавленной задаче, при длинной записи с пробелами
        cy.get('#taskInput').type('12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345 12345')
        cy.get('button[type="submit"]').click()
        // Проверка реализованности переноса текста в добавленной задаче, при длинной записи без пробелов
        cy.get('#taskInput').type('ффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффффф')
        cy.get('button[type="submit"]').click()
        // Проверка ввода пробела без других символов
        cy.get('#taskInput').type(' ')
        cy.get('button[type="submit"]').click()
        cy.screenshot('деловой/иные проверки')
    })
})