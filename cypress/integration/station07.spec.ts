import {compareColor} from '../utils/compareColor'

describe('Station7', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('<header> exists', () => {
    cy.get('header').should('have.class', 'header')

  })

  it('#F5F5F5 is specified as the background color of <header>', () => {
    cy.get('.header').then((header) => {
      expect(compareColor(header.css('background-color'), '#f5f5f5')).to.be.true })
    })
})