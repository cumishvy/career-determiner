document.getElementById('submitQuiz').addEventListener('click', function () {
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
    const facts = {
        'Data Scientist': 'Data scientists uncover insights from massive amounts of data to help solve complex problems.',
        'Artist': 'Artists bring imagination to life through visual and performing arts.',
        'Psychologist': 'Psychologists understand the human mind to help others improve their mental well-being.',
        'Software Developer': 'Software developers build the technology that powers our daily lives.',
        'Environmental Scientist': 'Environmental scientists work to protect the planet and study how humans impact ecosystems.',
        'Writer': 'Writers create engaging stories, articles, and books to captivate readers.',
        'Entrepreneur': 'Entrepreneurs innovate and lead businesses to make big ideas a reality!',
    };

    const recommendations = {
        'Data Scientist': ['Machine Learning Engineer', 'Statistician'],
        'Artist': ['Graphic Designer', 'Animator'],
        'Psychologist': ['Therapist', 'Social Worker'],
        'Software Developer': ['Game Developer', 'Web Developer'],
        'Environmental Scientist': ['Conservationist', 'Wildlife Biologist'],
        'Writer': ['Journalist', 'Screenwriter'],
        'Entrepreneur': ['Business Consultant', 'Startup Founder'],
    };

    if (q1.value === 'yes' && q4.value === 'science' && q5.value === 'yes') {
        career = 'Data Scientist';
    } else if (q1.value === 'no' && q4.value === 'art' && q3.value === 'yes') {
        career = 'Artist';
    } else if (q2.value === 'team' && q5.value === 'yes' && q6.value === 'indoor') {
        career = 'Psychologist';
    } else if (q3.value === 'yes' && q1.value === 'yes' && q6.value === 'indoor') {
        career = 'Software Developer';
    } else if (q6.value === 'outdoor' && q4.value === 'science') {
        career = 'Environmental Scientist';
    } else if (q4.value === 'art' && q5.value === 'no' && q6.value === 'indoor') {
        career = 'Writer';
    } else {
        career = 'Entrepreneur';
    }

    description = facts[career];

    // Save to leaderboard
    let careerCount = JSON.parse(localStorage.getItem('careerCount')) || {};
    careerCount[career] = (careerCount[career] || 0) + 1;
    localStorage.setItem('careerCount', JSON.stringify(careerCount));

    // Display result
    const similarCareers = recommendations[career] || [];
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerHTML = `
        <strong>Your Future Career:</strong> ${career}<br>
        <em>${description}</em><br><br>
        <strong>Similar Careers:</strong> ${similarCareers.join(', ')}
    `;

    // Display leaderboard
    let leaderboardHTML = '<strong>Most Popular Careers:</strong><br>';
    for (let [key, value] of Object.entries(careerCount)) {
        leaderboardHTML += `${key}: ${value}<br>`;
    }
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;

    // Enable Share Button
    const shareButton = document.getElementById('shareResult');
    shareButton.style.display = 'block';
    shareButton.addEventListener('click', () => {
        const shareText = `I just found out my future career is: ${career}! What’s yours? Try it here: [Your App Link]`;
        if (navigator.share) {
            navigator
                .share({
                    title: 'Future Career Predictor',
                    text: shareText,
                    url: '[Your App Link]', // Replace with your actual app URL
                })
                .catch(err => alert('Sharing not supported on this device.'));
        } else {
            alert('Sharing is not supported on this browser!');
        }
    });
});
