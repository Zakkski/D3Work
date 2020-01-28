describe('footer', () => {
    context('with a single todo', () => {
        it('displays a singular todo in count', () => {
            cy.seedAndVisit([{id: 1, name: 'Buy mild', isComplete: false}])
            cy.get('.todo-count')
                .should('contain', '1 todo left')
        })
    })

    context('with multiple todos', () => {
        beforeEach(() => {
            cy.seedAndVisit()
        })

        it('displays plural todos in count', () => {

            cy.get('.todo-count')
                .should('contain', '3 todos left')
        })

        it.only('handle filter links', () => {
            const filters = [
                { link: 'Active', expected: 3 },
                { link: 'Completed', expected: 1 },
                { link: 'All', expected: 4 }
            ]
            cy.wrap(filters)
                .each(filter => {
                    cy.contains(filter.link)
                        .click()
        
                    cy.get('.todo-list li')
                        .should('have.length', filter.expected)
                })
        })
    })
})