/*
 * The professional history, as data rather than as content, because none of it
 * has a page any more. Each role used to be a markdown file under src/work/
 * that built a page of its own, listed by a /work/ index; both are gone, and
 * what survives them is six rows on the home page. Six rows is a data file.
 *
 * The array's order is the list's order — newest first — which is why no entry
 * carries an `order` key to sort on. It also has to stay organisation-grouped:
 * the list prints an employer once per consecutive run, so splitting the Adobe
 * roles would print "Adobe" twice with a gap between.
 */
export default [
    {
        organisation: "Adobe",
        title: "Design systems and design engineering",
        summary: "Engineering leader for Adobe's Design organization, with focus on AI prototyping, new product incubation, and design systems."
    },
    {
        organisation: "Adobe",
        title: "Adobe Express",
        summary: "Real-time collaboration engineering, a11y engineering, and web platform technical partnerships."
    },
    {
        organisation: "Adobe",
        title: "Adobe XD",
        summary: "Graphics rendering and application performance engineering."
    },
    {
        organisation: "Adobe",
        title: "Design Studio and Digital Publishing Suite",
        summary: "iPad magazine publishing tools and new product incubation."
    },
    {
        organisation: "Mozilla",
        title: "Firefox",
        summary: "Leadership for CSS layout, graphics, animation, and a11y engineering."
    },
    {
        organisation: "Madefire",
        title: "Motion comics authoring",
        summary: "Web-based tools for making animated virtual reality, augmented reality, and 2D comics."
    }
];
