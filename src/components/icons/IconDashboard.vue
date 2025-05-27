<template>
    <div class="sidebar-icon-wrapper">
        <svg
            class="sidebar-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
        >
            <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2" />
            <line x1="4" y1="9" x2="20" y2="9" stroke-width="2" />
            <line x1="9" y1="10" x2="9" y2="20" stroke-width="2" />
        </svg>
    </div>
</template>

<style scoped>
.sidebar-icon-wrapper {
    color: #030819;
    transition: color 0.2s ease;
}

.sidebar-icon-wrapper:hover {
    color: white;
}
</style>
