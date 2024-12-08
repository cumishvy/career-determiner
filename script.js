document.getElementById('submitQuiz').addEventListener('click', function() {
    // Get user answers
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    const q5 = document.querySelector('input[name="q5"]:checked');
    const q6 = document.querySelector('input[name="q6"]:checked');

    // Check if all questions are answered
    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6) {
        alert('Please answer all questions!');
        return;
    }

    // Determine career based on answers
    let career = '';
    let description = '';

    if (q1.value === 'yes' && q4.value === 'science' && q5.value === 'yes') {
        career = 'Scientist';
        description = 'You are curious, love to experiment, and enjoy solving the mysteries of the universe!';
    } else if (q1.value === 'no' && q4.value === 'art' && q3.value === 'yes') {
        career = 'Artist';
        description = 'You have a creative mind and a talent for expressing yourself through visual or performing arts.';
    } else if (q2.value === 'team' && q5.value === 'yes' && q6.value === 'indoor') {
        career = 'Psychologist';
        description = 'You have a deep empathy for others and love helping people solve their problems.';
    } else if (q3.value === 'yes' && q1.value === 'yes' && q6.value === 'indoor') {
        career = 'Software Developer';
        description = 'You enjoy solving puzzles and creating amazing things with technology.';
    } else if (q6.value === 'outdoor' && q4.value === 'science') {
        career = 'Environmental Scientist';
        description = 'You are passionate about protecting the planet and love spending time outdoors.';
    } else if (q4.value === 'art' && q5.value === 'no' && q6.value === 'indoor') {
        career = 'Writer';
        description = 'You have a way with words and enjoy crafting stories, articles, or books.';
    } else {
        career = 'Entrepreneur';
        description = 'You are a natural leader with big ideas and the determination to make them happen!';
    }

    // Display result
    document.getElementById('result').innerHTML = `
        <strong>Your Future Career:</strong> ${career}<br>
        <em>${description}</em>
    `;
});
