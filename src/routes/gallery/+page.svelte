<script>
    let content = $state('');

    function fetchContent() {
        fetch('/content.txt')
            .then(response => response.text())
            .then(data => {
                content = data;
            })
            .catch(error => {
                console.error('Error fetching content:', error);
            });
    }

    function addProject() {
        const projectName = prompt('Enter the name of your project:');
        if (projectName) {
            content += `\n- ${projectName}`;
            fetchContent(); // Refresh content after adding a project
        }
    }
</script>