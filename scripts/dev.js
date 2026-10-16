const concurrently = require('concurrently')

// ANSI Colors
const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'
const C_CYAN = '\x1b[38;2;6;182;212m'      // #06B6D4 Neon Cyan
const C_BLUE = '\x1b[38;2;59;130;246m'     // #3B82F6 Electric Blue
const C_VIOLET = '\x1b[38;2;139;92;246m'   // #8B5CF6 Cyber Violet
const C_EMERALD = '\x1b[38;2;16;185;129m'  // #10B981 Emerald Green
const C_WHITE = '\x1b[38;2;249;250;251m'   // #F9FAFB Off White
const C_GRAY = '\x1b[38;2;107;114;128m'    // #6B7280 Muted Gray

function printBanner() {
  console.clear()
  console.log(`
${C_BLUE}╭${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}──╮${RESET}
${C_BLUE}│${RESET}  ${BOLD}${C_BLUE}HASSAN ${C_VIOLET}PORTFOLIO${RESET}                            ${C_VIOLET}│${RESET}
${C_BLUE}│${RESET}  ${C_CYAN}Full-Stack Developer${RESET} ${C_GRAY}•${RESET} ${C_VIOLET}Dev Environment${RESET}      ${C_VIOLET}│${RESET}
${C_BLUE}╰${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}───${C_CYAN}───${C_BLUE}───${C_VIOLET}──╯${RESET}

  ${C_BLUE}●${RESET} ${BOLD}${C_WHITE}SERVER${RESET}       ${C_GRAY}localhost:5000${RESET}       ${C_EMERALD}${BOLD}ONLINE${RESET}
  ${C_VIOLET}●${RESET} ${BOLD}${C_WHITE}CLIENT${RESET}       ${C_GRAY}localhost:3000${RESET}       ${C_EMERALD}${BOLD}ONLINE${RESET}
  ${C_CYAN}●${RESET} ${BOLD}${C_WHITE}DATABASE${RESET}     ${C_GRAY}MongoDB${RESET}              ${C_EMERALD}${BOLD}CONNECTED${RESET}

  ${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${C_CYAN}─${C_VIOLET}─${C_BLUE}─${RESET}
  ${C_CYAN}→${RESET} ${BOLD}${C_CYAN}http://localhost:3000${RESET}
  ${C_EMERALD}✓${RESET} ${BOLD}${C_EMERALD}Ready for development${RESET}
`)
}

printBanner()

const { result } = concurrently(
  [
    { command: 'npm run dev --prefix server', name: 'SERVER', prefixColor: 'cyan' },
    { command: 'npm run dev --prefix client', name: 'CLIENT', prefixColor: 'magenta' }
  ],
  {
    killOthers: ['failure'],
    restartTries: 0,
    hide: ['SERVER', 'CLIENT', '0', '1']
  }
)

result.then(
  () => process.exit(0),
  () => process.exit(1)
)
