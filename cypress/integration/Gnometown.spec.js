context('Actions', () => {
  beforeEach(() => {
    cy.viewport(920, 950)
  })

  it('visit the app', () => {
    cy.visit('http://localhost:1234')
  })

  it('click to show job filter list', () => {
    cy.get('[data-testid="job-filter-button"]').click()
  })
  it('we should have a  list with all gnomes', () => {
    cy.get('.gnomes-length').should('have.text', 'Current Gnomes: 1337')
  })

  it('add two jobs to filter', () => {
    cy.get('#Metalworker').click()
    cy.get('#Stonecarver').click()
  })

  it('we should have a  list with less gnomes', () => {
    cy.get('.gnomes-length').should('have.text', 'Current Gnomes: 34')
  })

  it('we should show all these gnomes clicking on view more', () => {
    cy.get('[data-testid="more-gnomes"]').should('be.visible')
    cy.get('.GnomeList').children().should('have.length', 20)
    cy.get('[data-testid="more-gnomes"]').click()
    cy.get('.GnomeList').children().should('have.length', 34)
    cy.get('[data-testid="more-gnomes"]').should('not.be.visible')
  })

  it('we should show name filter', () => {
    cy.get('[data-testid="job-filter-button"]').click()
    cy.get('[data-testid="name-filter-button"]').click()
  })

  it('we should add name filter', () => {
    cy.get('[data-testid="filter-name-input"]').type('ToBuS')
  })
  it('we should have only a gnome', () => {
    cy.get('.GnomeList').children().should('have.length', 1)
  })
  it('we should remove all the current filters and hide name filter', () => {
    cy.get('[data-testid="name-filter-button"]').click()
    cy.get('[data-testid="reset-filter-button"]').click()
  })
  it('we should check a gnome profile', () => {
    cy.get('.GnomeList').children().eq(0).click()
  })

  it('we can see all the props', () => {
    cy.get('[data-testid="detail-image"]').should('be.visible')
    cy.get('[data-testid="detail-properties"]').should('be.visible')
    cy.get('[data-testid="detail-professions"]').should('be.visible')
    cy.get('[data-testid="detail-friends"]').should('be.visible')
  })

  it('we can visit any friend', () => {
    cy.get('[data-testid="gnome-url"]').eq(1).click()
  })

  it('we can back to home', () => {
    cy.get('.fas.fa-home').click()
  })
})
