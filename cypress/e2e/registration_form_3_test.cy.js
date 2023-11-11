beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */

describe('Input fields', () => {
    it('Visual test V001 for registration form 3', () => {
        // 1. Logo size
        cy.log('Checking image is right size')
        cy.get('img').invoke('height').should('be.eq', 166)
        cy.get('img').invoke('width').should('be.eq', 178)
    })
    
    it('Visual test V002 for registration form 3', () => {
        // 2. Name input and label
        cy.log('Checking "Name" input is present')
        cy.get('input[name="name"]').should('exist')
        cy.get('label[for="name"]').should('exist').contains('Name')        
    })
    
    it('Visual test V003 for registration form 3', () => {
        // 3. Email input and label
        cy.log('Checking email input is present')
        cy.get('input[name="email"]').should('exist')
        cy.get('label[for="email"]').should('exist').contains('Email')

        cy.get('input[name="email"]').type('test')
        cy.get('#emailAlert').should('be.visible').contains('Invalid email address.')
        cy.get('input[name="email"]').clear()
        cy.get('#emailAlert').should('be.visible').contains('Email is required.')
    })

    it('Visual test V004 for registration form 3', () => {        
        // 4. Country selector and label
        cy.log('Checking country selector')
        cy.get('#country').select('Estonia')

        // print out what val returns - just testing purposes
        cy.get('#country').its('val').then((val) => {
            cy.log(`Elemente on kokku: ${val}`);
        })
        cy.get('#country').select('Estonia')

        // print out number of elements
        cy.get('#country').its('length').then((length) => {
            cy.log(`Elemente on kokku: ${length}`);
        })

    })
    
    it('Visual test V005 for registration form 3', () => {
        // 5. City selector and label
        cy.log('Checking city selector')
        cy.get('#city').should('exist')
        cy.get('label[for="city"]').should('exist').contains('City')
    })

    it('Visual test V006 for registration form 3', () => {
        // 6. Two selector dependencies
        cy.log('Checking both selector dependencies')
        /* cy.wait(1000) */
        cy.get('#country').select('Estonia').find('option').should('have.length', 4)
        cy.get('#city').select('Tallinn').find('option').should('have.length', 4)
        cityAssertion('Tallinn', 1)
        cityAssertion('Haapsalu', 2)
        cityAssertion('Tartu', 3)
        cy.get('#country').select('Spain').find('option').should('have.length', 4)
        cy.get('#city').select('Malaga').find('option').should('have.length', 5)
        cityAssertion('Malaga', 1)
        cityAssertion('Madrid', 2)
        cityAssertion('Valencia', 3)
        cityAssertion('Corralejo', 4)
        cy.get('#country').select('Austria').find('option').should('have.length', 4)
        cy.get('#city').select('Vienna').find('option').should('have.length', 4)
        cityAssertion('Vienna', 1)
        cityAssertion('Salzburg', 2)
        cityAssertion('Innsbruck', 3)         


        cy.get('#city').find('option').then(options => {
            const actual = [...options].map(option => option.value)

            for(const element in actual){
                cy.log(actual[element])
            }
        })          
    })

    it('Visual test V007 for registration form 3', () => {
        // 7. Checking Date elements
        cy.log('Checking "Date of birt" selector')
        cy.get('div').should('contain', 'Date of birth')
        cy.get('div input[type="date"').should('exist')

        cy.log('Chekcing "Birthday" selector')
        cy.get('#birthday').should('exist')
        cy.get('label[for="birthday"]').should('exist').contains('Birthday:')
    })
    
    it('Visual test V008 for registration form 3', () => {        
        // 8. Frequency selector is present
        cy.log('Frequency radio button selector')
        cy.get('input[name="freq"]').first().should('have.value', 'Daily')
        cy.get('input[name="freq"]').eq(1).should('have.value', 'Weekly')
        cy.get('input[name="freq"]').eq(2).should('have.value', 'Monthly')
        cy.get('input[name="freq"]').last().should('have.value', 'Never')
    })

    it('Visual test V009 for registration form 3', () => {        
        // 9. Selecting radio buttons on frequency selector
        cy.log('Frequency radio button selector')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[name="freq"]').first().should('not.be.checked')
        cy.get('input[name="freq"]').eq(1).should('not.be.checked')
        cy.get('input[name="freq"]').eq(2).should('not.be.checked')
        cy.get('input[name="freq"]').last().should('not.be.checked')

        cy.get('input[name="freq"]').first().click().should('be.checked')
        cy.get('input[name="freq"]').eq(1).click().should('be.checked')
        cy.get('input[name="freq"]').first().should('not.be.checked')
    })

    it('Visual test V010 for registration form 3', () => {
        // 10. Checkboxes
        cy.log('Checking for checkboxes')
        cy.get('div input[type="checkbox"]').eq(0).should('not.be.checked').check().should('be.checked')
        cy.get('div input[type="checkbox"]').eq(1).should('not.be.checked').check().should('be.checked')
    })
    
    it('Visual test V011 for registration form 3', () => {
        // 11. File input
        cy.log('Checking file input')
        cy.get('input[type="file"').should('exist').should('have.id', 'myFile')
        
    })

    it('Visual test V012 for registration form 3', () => {
        // 12. Submit buttons
        cy.log('Checking for submit buttons')
        cy.get('input[type="submit"]').eq(0).should('exist').should('be.enabled')
        cy.get('input[type="submit"]').eq(1).should('exist').should('be.disabled').should('have.attr', 'onclick', 'postYourAdd()')
    })

    it('Visual test V013 for registration form 3', () => {
        // 13. Policy link
        cy.log('Checking cookie policy link')
        cy.get('button').contains('Accept our cookie policy').should('have.attr', 'href', 'cookiePolicy.html').click()
        cy.url().should('contain', '/cookiePolicy.html')
        
    })

    it('Functional test F001 for registration form 3', () => {
        // 01. all fields are filled in + validation
        cy.log('Validate form when all fields are correctly filled')
        cy.get('#name').type('Pennyvise').should('contain.value', 'Pennyvise')
        cy.get('input[name="email"]').type('my@email.is')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('div:has(label:contains("Date of birth")) input[type="date"]').eq(0).type('2023-11-23').should('contain.value', '2023-11-23')
        cy.get('input[name="freq"]').eq(1).check().should('be.checked')
        cy.get('#birthday').eq(0).type('2023-11-23').should('contain.value', '2023-11-23')
        cy.get('div input[type="checkbox"]').eq(0).should('not.be.checked').check().should('be.checked')
        cy.get('div input[type="checkbox"]').eq(1).should('not.be.checked').check().should('be.checked')
        cy.get('p').find('input[type="submit"]').click()
        cy.url().should('contain', '/upload_file.html?name=Name...Pennyvise&email=my%40email.is&freq=Weekly&birthday=2023-11-23&filename=')
    })
    it('Functional test F002 for registration form 3', () => {
        // 02. only mandatory fields are filled in + validations
        cy.log('Validate form with only mandatory fields correctly filled')
        cy.get('#name').type('Pennyvise').should('contain.value', 'Pennyvise')
        cy.get('input[name="email"]').type('my@email.is')
        cy.get('#country').select('Estonia')
        cy.get('#city').select('Tallinn')
        cy.get('div:has(label:contains("Date of birth")) input[type="date"]').eq(0).type('2023-11-23').should('contain.value', '2023-11-23')
        cy.get('div input[type="checkbox"]').eq(0).should('not.be.checked').check().should('be.checked')
        cy.get('p').find('input[type="submit"]').click()
        cy.url().should('contain', '/upload_file.html?name=Name...Pennyvise&email=my%40email.is&birthday=&filename=')

    })
    it('Functional test F003 for registration form 3', () => {
        // 03. mandatory fields are absent + validations (try using function)
        missingData()
    })
    it('Functional test F004 for registration form 3', () => {
        // 04. If city is already chosen and country is updated, then city choice should be removed
        cy.log('Reselecting country')
        cy.get('#country').select('Estonia').find('option')
        cy.get('#city').select('Tallinn').find('option').should('have.length', 4)
        cy.get('#city').find('option').should('contain', 'Tallinn')
        cy.get('#country').select('Spain').find('option').should('have.length', 4)
        cy.get('#city').find('option').should('not.contain', 'Tallinn')
    })
    it('Functional test F005 for registration form 3', () => {
        // 05. add file
        cy.log('Uploading a file')
        cy.get('#myFile').selectFile('cypress/fixtures/example.pdf')
        cy.get('input[type="submit"]').eq(0).click()
        cy.url().should('contain', '/upload_file.html?name=Name...&email=&birthday=&filename=example.pdf')

    })
})

function missingData(){
    cy.log('Just empty form submission')
    cy.get('p').find('input[type="submit"]').should('be.disabled')
    cy.url().should('not.contain', '/upload_file.html')
}

function cityAssertion(city, pos) {
    cy.get('#city option:contains("' + city + '")').invoke('index').should('be.eq', pos)
}
