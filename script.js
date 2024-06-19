function run() {
    let htmlCode = document.querySelector('#html-code').value;
    let cssCode = document.querySelector('#css-code').value;
    let jsCode = document.querySelector('#js-code').value;
    let output = document.querySelector('#output');
    let errorsDiv = document.querySelector('#errors');
    errorsDiv.innerHTML = '';

    // Update iframe content
    output.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
    output.contentWindow.eval(jsCode);

    // Run HTML lint
    htmllint(htmlCode).then((issues) => {
        displayIssues(issues, 'HTML');
    }).catch(err => {
        console.error('HTML linting error:', err);
    });

    // Run CSS lint
    let cssIssues = CSSLint.verify(cssCode).messages;
    displayIssues(cssIssues, 'CSS');

    // Run JS lint
    try {
        const linter = new eslint.Linter();
        const messages = linter.verify(jsCode, { rules: { semi: 2 } });
        displayIssues(messages, 'JavaScript');
    } catch (err) {
        console.error('JS linting error:', err);
    }
}

function displayIssues(issues, type) {
    let errorsDiv = document.querySelector('#errors');
    issues.forEach(issue => {
        let p = document.createElement('p');
        p.textContent = `${type} Error: ${issue.message || issue}`;
        errorsDiv.appendChild(p);
    });
}



