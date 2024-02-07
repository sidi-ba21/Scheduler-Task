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
