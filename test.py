class Person:
    def __init__(self, name, age, city):
        self.name = name
        self.age = int(age)
        self.city = city

    def __repr__(self):
        return f"Person(name={self.name}, age={self.age}, city={self.city})"

response = "<tr><td>John</td><td>19</td><td>Paris</td></tr><tr><td>Ali</td><td>24</td><td>Milan</td></tr>"

persons = []
for row in response.split("<tr>"):
    if row.strip():
        name, age, city = [cell.strip("</td>") for cell in row.split("<td>") if cell.strip()]
        persons.append(Person(name, age, city))

# Trier la liste des objets Person par nom puis par âge
sorted_persons = sorted(persons, key=lambda x: (x.name, x.age))

for person in sorted_persons:
    print(person)


###
private getCssContent(): string {
    const stylesheets = this.elementRef.nativeElement.ownerDocument.styleSheets;
    let cssContent = '';

    // Function to check if a CSS rule comes from a Bootstrap stylesheet
    const isBootstrapRule = (rule: CSSStyleRule) => {
        return rule.parentStyleSheet && rule.parentStyleSheet.href && rule.parentStyleSheet.href.includes('bootstrap.min.css');
    };

    for (let i = 0; i < stylesheets.length; i++) {
        const stylesheet = stylesheets[i];
        if (stylesheet.href) {
            // Fetch external CSS content if available
            // You may need to handle CORS if stylesheet is from a different domain
            // Example: https://stackoverflow.com/questions/33592570/cross-domain-css-link-gets-blocked-by-cors-policy-how-to-bypass-this
        } else {
            // Inline CSS content
            const rules = stylesheet.cssRules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                // Include the rule if it's not from a Bootstrap stylesheet
                if (!isBootstrapRule(rule)) {
                    cssContent += rule.cssText;
                }
            }
        }
    }
    return cssContent;
}

###
