const terminal = document.getElementById('terminal');
const logoSplash = document.getElementById('logo-splash');

const jailbreakSteps = [
    "checkra1n 0.12.4 beta",
    "PongoOS - iOS 14.x Bootchain",
    "Build Date: Feb 1 2024",
    "--------------------------------------------------",
    "Booting with arguments: verbose=1 debug=0",
    "PCIe: Initializing...",
    "PCIe: Link up (gen 2, x1)",
    "I2C: Initializing device 0x20",
    "UART: Ready for communication",
    "USB: Device enumerated successfully",
    "USB: Found DFU device [0x05ac:0x1227]",
    "Exploiting with checkm8...",
    "Heap spray successful!",
    "Triggering vulnerability...",
    "checkm8 exploit complete. Device now in pwned DFU.",
    "--------------------------------------------------",
    "Sending PongoOS payload...",
    "Payload size: 124576 bytes",
    "Transferring data... [0%]",
    "Transferring data... [10%]",
    "Transferring data... [20%]",
    "Transferring data... [30%]",
    "Transferring data... [40%]",
    "Transferring data... [50%]",
    "Transferring data... [60%]",
    "Transferring data... [70%]",
    "Transferring data... [80%]",
    "Transferring data... [90%]",
    "Transferring data... [100%]",
    "Payload sent. Waiting for PongoOS boot.",
    "PongoOS booted. Setting up environment...",
    "--------------------------------------------------",
    "Applying low-level kernel patches...",
    "Patching AMFI bypass...",
    "Patching sandbox restrictions...",
    "Patching code signing checks...",
    "Disabling system integrity protection (SIP)...",
    "Disabling APFS snapshotting for root partition...",
    "Remounting root filesystem as read/write...",
    "Mounting /dev/disk0s1s1 at /mnt1",
    "Mounting /dev/disk0s1s2 at /",
    "--------------------------------------------------",
    "Installing bootstrap and package manager...",
    "Downloading Cydia/Sileo bootstrap...",
    "Extracting files to /var/jb...",
    "Configuring environment variables...",
    "Running post-installation scripts...",
    "Setting up SSH server...",
    "Adding default repositories...",
    "Verifying filesystem integrity...",
    "Filesystem check completed. No errors found.",
    "--------------------------------------------------",
    "Jailbreak process complete.",
    "Your device will now restart.",
    "Please unlock your device and open Cydia/Sileo.",
    "",
    "             _          _              ",
    "  ___ _ __  | |__   ___| |__  _ __ ___ ",
    " / __| '_ \\ | '_ \\ / _ \\ '_ \\| '__/ _ \\",
    "| (__| | | || |_) |  __/ |_) | | |  __/",
    " \\___|_| |_||_.__/ \\___|_.__/|_|  \\___|",
    "",
    "       Thanks for using checkra1n!",
    "        Visit checkra.in for more."
];

let lineIndex = 0;
const lineDelay = 5;  // Milliseconds before next line starts typing (very fast)

function typeLine() {
    if (lineIndex < jailbreakSteps.length) {
        const currentLine = jailbreakSteps[lineIndex];
        // Append entire line instantly
        terminal.textContent += currentLine + '\n';
        lineIndex++;
        terminal.scrollTop = terminal.scrollHeight; // Scroll to bottom
        setTimeout(typeLine, lineDelay);
    }
}

function startSimulation() {
    // The logo is now permanently visible due to CSS changes.
    // Start typing the terminal output immediately.
    typeLine();
}

// Start the simulation when the page loads
document.addEventListener('DOMContentLoaded', startSimulation);