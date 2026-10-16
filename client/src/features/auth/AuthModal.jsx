import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  FiX, FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiBriefcase,
  FiZap, FiCheck, FiLogIn, FiShield, FiGlobe, FiStar, FiCpu,
  FiTrendingUp, FiPhone, FiGift, FiCamera, FiAtSign, FiSun,
  FiMoon, FiAlertTriangle, FiClock, FiRefreshCw, FiChevronDown
} from 'react-icons/fi'
import { FaGoogle, FaGithub, FaLinkedin, FaFingerprint, FaQrcode } from 'react-icons/fa'
import { toast } from 'react-toastify'
import confetti from 'canvas-confetti'
import { useAuth } from './useAuth'
import './AuthModal.css'

// ── Constants ─────────────────────────────────────────────────────
const MAX_ATTEMPTS = 5
const LOCKOUT_SECS = 30

const COUNTRIES = [
  '🇸🇴 Somalia','🇺🇸 United States','🇬🇧 United Kingdom','🇦🇪 UAE',
  '🇸🇦 Saudi Arabia','🇨🇦 Canada','🇦🇺 Australia','🇩🇪 Germany',
  '🇫🇷 France','🇯🇵 Japan','🇰🇷 South Korea','🇮🇳 India',
  '🇳🇬 Nigeria','🇰🇪 Kenya','🇪🇹 Ethiopia','🇿🇦 South Africa',
  '🇧🇷 Brazil','🇳🇱 Netherlands','🇸🇪 Sweden','🇳🇴 Norway',
  '🇨🇳 China','🇹🇷 Turkey','🇵🇰 Pakistan','🇪🇬 Egypt','🇲🇦 Morocco',
]

const PURPOSES = [
  { value:'user',      icon:'🌐', label:'Exploring',   desc:'Just visiting' },
  { value:'recruiter', icon:'💼', label:'Hiring',       desc:'Looking for talent' },
  { value:'developer', icon:'⚡', label:'Collaborating',desc:'Fellow developer' },
  { value:'investor',  icon:'📈', label:'Investing',    desc:'Business / deals' },
  { value:'student',   icon:'🎓', label:'Learning',     desc:'Student & researcher' },
]

const STAY_OPTS = [
  { value:'session', label:'Session' },
  { value:'1day',    label:'1 Day'   },
  { value:'1week',   label:'1 Week'  },
  { value:'forever', label:'Forever' },
]

const EMAIL_DOMAINS = {
  'gmail.com':      { label:'Gmail',     color:'#ea4335' },
  'outlook.com':    { label:'Outlook',   color:'#0078d4' },
  'hotmail.com':    { label:'Hotmail',   color:'#0078d4' },
  'yahoo.com':      { label:'Yahoo',     color:'#6001d2' },
  'icloud.com':     { label:'iCloud',    color:'#147aff' },
  'protonmail.com': { label:'ProtonMail',color:'#6d4aff' },
  'proton.me':      { label:'ProtonMail',color:'#6d4aff' },
}

// ── Helpers ───────────────────────────────────────────────────────
function analyzePassword(pwd) {
  if (!pwd) return { score:0, label:'', color:'' }
  let s = 0
  if (pwd.length >= 8)  s++
  if (pwd.length >= 12) s++
  if (/[A-Z]/.test(pwd)) s++
  if (/[0-9]/.test(pwd)) s++
  if (/[^A-Za-z0-9]/.test(pwd)) s++
  const L = [
    {label:'Too Weak',color:'#ef4444'},{label:'Weak',color:'#f97316'},
    {label:'Fair',color:'#eab308'},{label:'Good',color:'#22c55e'},
    {label:'Strong',color:'#06b6d4'},{label:'Elite',color:'#818cf8'},
  ]
  return { score:s, ...L[Math.min(s,5)] }
}

function getPwReqs(pwd) {
  return [
    { label:'8+ characters',      met: pwd.length >= 8 },
    { label:'Uppercase letter',   met: /[A-Z]/.test(pwd) },
    { label:'Number',             met: /[0-9]/.test(pwd) },
    { label:'Special character',  met: /[^A-Za-z0-9]/.test(pwd) },
  ]
}

function getEmailBadge(email) {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return null
  return EMAIL_DOMAINS[domain] || { label: domain, color:'#6B7280' }
}

function formatPhone(v) {
  const d = v.replace(/\D/g,'')
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0,3)}-${d.slice(3)}`
  return `${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6,10)}`
}

// ── Simulated QR Code ─────────────────────────────────────────────
function SimulatedQR({ seed=1 }) {
  const S = 21
  const cells = Array.from({ length: S*S }, (_,i) => {
    const x = i % S, y = Math.floor(i/S)
    const inFinder=(cx,cy,lx=x,ly=y) => {
      const dx=lx-cx, dy=ly-cy
      if (dx<0||dx>6||dy<0||dy>6) return false
      if (dx===0||dx===6||dy===0||dy===6) return true
      if (dx>=2&&dx<=4&&dy>=2&&dy<=4) return true
      return false
    }
    if (inFinder(0,0)) return true
    if (inFinder(14,0)) return true
    if (inFinder(0,14)) return true
    if (y===6&&x>=8&&x<=12) return x%2===0
    if (x===6&&y>=8&&y<=12) return y%2===0
    return ((x*31+y*17+seed*13)%100) > 42
  })
  return (
    <div className="qr-grid">
      {cells.map((on,i)=><div key={i} className={`qr-cell ${on?'qr-on':''}`}/>)}
    </div>
  )
}

// ── Particles ─────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="auth-particles" aria-hidden="true">
      {Array.from({length:16}).map((_,i)=>(
        <span key={i} className="auth-particle" style={{
          '--x':`${Math.random()*100}%`,'--y':`${Math.random()*100}%`,
          '--dur':`${3+Math.random()*5}s`,'--delay':`${Math.random()*4}s`,
          '--size':`${2+Math.random()*3}px`,
        }}/>
      ))}
    </div>
  )
}

// ── AuthField ─────────────────────────────────────────────────────
const AuthField = React.forwardRef(function AuthField(
  {id,icon,name,type='text',placeholder,value,onChange,autoComplete,error,required,maxLength,suffix,children},ref
){
  return (
    <div className="auth-field-wrap">
      <div className={`auth-field ${error?'has-error':''}`}>
        <span className="field-icon">{icon}</span>
        <input id={id} ref={ref} className={`auth-input ${error?'input-error':''}`}
          name={name} type={type} placeholder={placeholder} value={value}
          onChange={onChange} autoComplete={autoComplete} required={required} maxLength={maxLength}/>
        {suffix}
        {value&&!error&&<span className="field-valid"><FiCheck size={12}/></span>}
      </div>
      <div className="field-meta-row">
        {error&&<span className="field-error-msg">{error}</span>}
        {children}
      </div>
    </div>
  )
})

// ── Main Component ────────────────────────────────────────────────
export default function AuthModal({ isOpen, onClose, initialMode='login' }) {
  const { register, login, loading } = useAuth()

  // Core state
  const [mode, setMode]       = useState(initialMode) // 'login'|'register'|'qr'
  const [step, setStep]       = useState(1)
  const [isDark, setIsDark]   = useState(true)
  const [shaking, setShaking] = useState(false)

  // Login extras
  const [rememberMe, setRememberMe]         = useState(false)
  const [stayLoggedIn, setStayLoggedIn]     = useState('session')
  const [showStayOpts, setShowStayOpts]     = useState(false)
  const [loginAttempts, setLoginAttempts]   = useState(0)
  const [lockoutUntil, setLockoutUntil]     = useState(null)
  const [lockoutCountdown, setLockoutCount] = useState(0)

  // Password / confirm visibility
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Register extras
  const [touched, setTouched]           = useState({})
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(null)

  // QR state
  const [qrSeed, setQrSeed]       = useState(Math.floor(Math.random()*1000))
  const [qrTimer, setQrTimer]     = useState(60)

  // Success state
  const [successInfo, setSuccessInfo] = useState(null)

  const cardRef      = useRef(null)
  const firstInputRef= useRef(null)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState({
    name:'', username:'', email:'', password:'', confirmPassword:'',
    phone:'', country:'', role:'user', referralCode:'', avatar:null,
  })

  const pwStrength = analyzePassword(form.password)
  const pwReqs     = getPwReqs(form.password)
  const emailBadge = form.email.includes('@') ? getEmailBadge(form.email) : null

  // ── Reset on open ──────────────────────────────────────────────
  useEffect(()=>{
    if (!isOpen) return
    setMode(initialMode); setStep(1); setTouched({}); setAgreedToTerms(false)
    setAvatarPreview(null); setSuccessInfo(null); setShowPass(false); setShowConfirm(false)
    setShowStayOpts(false)
    const savedEmail = localStorage.getItem('auth_remember_email') || ''
    setForm({ name:'', username:'', email: savedEmail, password:'', confirmPassword:'',
      phone:'', country:'', role:'user', referralCode:'', avatar:null })
    if (savedEmail) setRememberMe(true)
    setTimeout(()=>firstInputRef.current?.focus(), 120)
  },[isOpen, initialMode])

  // ── ESC close ─────────────────────────────────────────────────
  useEffect(()=>{
    const fn = e => e.key==='Escape' && !successInfo && onClose()
    window.addEventListener('keydown',fn)
    return ()=>window.removeEventListener('keydown',fn)
  },[onClose, successInfo])

  // ── Lockout countdown ──────────────────────────────────────────
  useEffect(()=>{
    if (!lockoutUntil) return
    const iv = setInterval(()=>{
      const rem = Math.ceil((lockoutUntil - Date.now())/1000)
      if (rem<=0){ setLockoutUntil(null); setLockoutCount(0); setLoginAttempts(0) }
      else setLockoutCount(rem)
    },1000)
    return ()=>clearInterval(iv)
  },[lockoutUntil])

  // ── QR timer ──────────────────────────────────────────────────
  useEffect(()=>{
    if (mode!=='qr') return
    setQrTimer(60)
    const iv = setInterval(()=>{
      setQrTimer(t=>{ if(t<=1){ setQrSeed(Math.floor(Math.random()*1000)); return 60 } return t-1 })
    },1000)
    return ()=>clearInterval(iv)
  },[mode])

  // ── 3D tilt ───────────────────────────────────────────────────
  const handleMouseMove = useCallback(e=>{
    const card=cardRef.current; if(!card) return
    const r=card.getBoundingClientRect()
    const x=((e.clientX-r.left)/r.width-0.5)*8
    const y=((e.clientY-r.top)/r.height-0.5)*-8
    card.style.transform=`perspective(1200px) rotateX(${y}deg) rotateY(${x}deg)`
  },[])
  const handleMouseLeave=useCallback(()=>{
    if(cardRef.current) cardRef.current.style.transform='perspective(1200px) rotateX(0) rotateY(0)'
  },[])

  // ── Shake on error ─────────────────────────────────────────────
  const shake=()=>{ setShaking(true); setTimeout(()=>setShaking(false),600) }

  // ── Field change ──────────────────────────────────────────────
  const handleChange=e=>{
    let {name,value}=e.target
    if(name==='name')     value=value.replace(/[0-9]/g,'').slice(0,50)
    if(name==='username') value=value.replace(/[^a-z0-9_]/gi,'').toLowerCase().slice(0,20)
    if(name==='phone')    value=formatPhone(value)
    setForm(f=>({...f,[name]:value}))
    setTouched(t=>({...t,[name]:true}))
  }

  // ── Avatar upload ─────────────────────────────────────────────
  const handleAvatar=e=>{
    const file=e.target.files[0]; if(!file) return
    if(file.size>5*1024*1024) return toast.error('Image must be under 5MB')
    const r=new FileReader()
    r.onload=ev=>setAvatarPreview(ev.target.result)
    r.readAsDataURL(file)
    setForm(f=>({...f,avatar:file}))
  }

  // ── Validation ────────────────────────────────────────────────
  const fieldError=name=>{
    if(!touched[name]) return ''
    if(name==='name'&&form.name.length<2) return 'Min 2 characters'
    if(name==='username'&&form.username.length<3) return 'Min 3 characters'
    if(name==='email'&&!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) return 'Invalid email'
    if(name==='password'&&form.password.length<6) return 'Min 6 characters'
    if(name==='confirmPassword'&&form.confirmPassword!==form.password) return "Doesn't match"
    return ''
  }

  // ── Step validation ───────────────────────────────────────────
  const validateStep=()=>{
    if(step===1){
      if(!form.name||form.name.length<2)   { shake(); return toast.error('Enter full name.')||false }
      if(!form.username||form.username.length<3){ shake(); return toast.error('Enter username (3+ chars).')||false }
      if(!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)){ shake(); return toast.error('Enter valid email.')||false }
    }
    if(step===2){
      if(!form.country){ shake(); return toast.error('Select your country.')||false }
    }
    if(step===3){
      if(form.password.length<6){ shake(); return toast.error('Password min 6 chars.')||false }
      if(form.password!==form.confirmPassword){ shake(); return toast.error("Passwords don't match.")||false }
      if(!agreedToTerms){ shake(); return toast.error('Please agree to the terms.')||false }
    }
    return true
  }

  // ── Confetti ──────────────────────────────────────────────────
  const fireConfetti=()=>confetti({
    particleCount:120, spread:80, origin:{y:0.6},
    colors:['#6366f1','#8b5cf6','#06b6d4','#10b981','#f59e0b','#ec4899']
  })

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit=async e=>{
    e.preventDefault()
    if(lockoutUntil){ shake(); return toast.error(`Locked for ${lockoutCountdown}s`) }

    if(mode==='register'){
      if(!validateStep()) return
      if(step<3) return setStep(s=>s+1)
      const res=await register({ name:form.name, email:form.email, password:form.password,
        company:'', role:form.role })
      if(!res.success){ shake(); return toast.error(res.message) }
      fireConfetti()
      setSuccessInfo({ name:form.name, role:form.role })
      setTimeout(()=>{ onClose(); setSuccessInfo(null) },2200)
    } else {
      if(!form.email||!form.password){ shake(); return toast.error('Fill in email and password.') }
      const res=await login({ email:form.email, password:form.password })
      if(!res.success){
        const next=loginAttempts+1; setLoginAttempts(next)
        if(next>=MAX_ATTEMPTS){ setLockoutUntil(Date.now()+LOCKOUT_SECS*1000); setLockoutCount(LOCKOUT_SECS) }
        shake(); return toast.error(res.message)
      }
      if(rememberMe) localStorage.setItem('auth_remember_email',form.email)
      else           localStorage.removeItem('auth_remember_email')
      fireConfetti()
      setSuccessInfo({ name:res.user?.name||form.email.split('@')[0], role:form.role })
      setTimeout(()=>{ onClose(); setSuccessInfo(null) },2200)
    }
  }

  if(!isOpen) return null
  const isReg=mode==='register'
  const isQR =mode==='qr'
  const isLocked=!!lockoutUntil

  return (
    <div className="auth-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <Particles/>
      <div className="auth-grid-bg" aria-hidden="true"/>

      <div
        className={`auth-card ${isDark?'':'auth-card--light'} ${shaking?'auth-shake':''}`}
        ref={cardRef}
        data-theme={isDark?'dark':'light'}
        onClick={e=>e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Corner accents */}
        <div className="auth-corner auth-corner--tl"/><div className="auth-corner auth-corner--tr"/>
        <div className="auth-corner auth-corner--bl"/><div className="auth-corner auth-corner--br"/>
        <div className="auth-border-glow"/>

        {/* ── Success Overlay ─────────────────────────────── */}
        {successInfo&&(
          <div className="auth-success-overlay">
            <div className="success-ring"><FiCheck size={36}/></div>
            <h3 className="success-title">Welcome, {successInfo.name}!</h3>
            <p className="success-sub">Session active · {STAY_OPTS.find(o=>o.value===stayLoggedIn)?.label||'Session'}</p>
            <span className="success-role-badge">
              {PURPOSES.find(p=>p.value===successInfo.role)?.icon} {PURPOSES.find(p=>p.value===successInfo.role)?.label}
            </span>
          </div>
        )}

        {/* ── Controls Row ────────────────────────────────── */}
        <div className="auth-controls-row">
          <button className="auth-theme-btn" onClick={()=>setIsDark(d=>!d)} title="Toggle theme">
            {isDark?<FiSun size={14}/>:<FiMoon size={14}/>}
          </button>
          <button className="auth-close-btn" onClick={onClose} aria-label="Close"><FiX/></button>
        </div>

        {/* ── Header ──────────────────────────────────────── */}
        <div className="auth-header">
          <div className="auth-logo-wrap">
            <div className="auth-logo-ring">
              <img src="/LOGO.png" alt="Logo" className="auth-logo-img"/>
            </div>
            <div className="auth-logo-badge"><FiStar size={9}/></div>
          </div>
          <h2 className="auth-title">
            {isQR?'QR Login':isReg?'Join the Platform':'Welcome Back'}
          </h2>
          <p className="auth-sub">
            {isQR?'Scan with your mobile device to sign in instantly.'
              :isReg?'Create your account to unlock the full experience.'
              :'Sign in to access your personalized session.'}
          </p>
          <div className="auth-badges">
            <span className="auth-badge"><FiShield size={10}/> Encrypted</span>
            <span className="auth-badge"><FiCpu size={10}/> AI-Protected</span>
            <span className="auth-badge"><FiGlobe size={10}/> Global CDN</span>
          </div>
        </div>

        {/* ── Mode Switcher ────────────────────────────────── */}
        <div className="auth-mode-switch" role="tablist">
          <button role="tab" aria-selected={!isReg&&!isQR}
            className={`mode-btn ${!isReg&&!isQR?'active':''}`}
            onClick={()=>{setMode('login');setStep(1)}}>
            <FiLogIn/> Sign In
          </button>
          <button role="tab" aria-selected={isReg}
            className={`mode-btn ${isReg?'active':''}`}
            onClick={()=>{setMode('register');setStep(1)}}>
            <FiZap/> Register
          </button>
          <button role="tab" aria-selected={isQR}
            className={`mode-btn ${isQR?'active':''}`}
            onClick={()=>setMode('qr')}>
            <FaQrcode/> QR
          </button>
        </div>

        {/* ── QR Mode ─────────────────────────────────────── */}
        {isQR&&(
          <div className="qr-mode-wrap">
            <div className="qr-card-inner">
              <SimulatedQR seed={qrSeed}/>
              <div className="qr-overlay-scan"/>
            </div>
            <div className="qr-meta">
              <span className="qr-code-label">CODE: <b>HPRT-{qrSeed.toString().padStart(4,'0')}</b></span>
              <span className="qr-timer"><FiClock size={11}/> Refreshes in {qrTimer}s</span>
            </div>
            <button className="qr-refresh-btn" onClick={()=>{setQrSeed(Math.floor(Math.random()*1000));setQrTimer(60)}}>
              <FiRefreshCw size={13}/> Refresh QR
            </button>
            <p className="qr-hint">Scan with Hassan Portfolio mobile app</p>
            <button className="auth-back-btn" onClick={()=>setMode('login')}>← Back to Sign In</button>
          </div>
        )}

        {/* ── Register / Login Forms ───────────────────────── */}
        {!isQR&&(
          <>
            {/* Register stepper */}
            {isReg&&(
              <div className="auth-stepper">
                {[{l:'Identity'},{l:'Profile'},{l:'Security'}].map(({l},idx)=>(
                  <React.Fragment key={idx}>
                    <div className={`auth-step ${step>idx?'done':''} ${step===idx+1?'active':''}`}>
                      <span className="step-dot">{step>idx+1?<FiCheck size={9}/>:idx+1}</span>
                      <span className="step-label">{l}</span>
                    </div>
                    {idx<2&&<div className={`auth-step-line ${step>idx+1?'active':''}`}/>}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Social buttons (login only, or register step 1) */}
            {(!isReg||step===1)&&(
              <>
                <div className="auth-social">
                  <button className="social-btn social-btn--google" type="button" onClick={()=>toast.info('Google OAuth — coming soon!')}>
                    <FaGoogle/><span>Google</span>
                  </button>
                  <button className="social-btn social-btn--github" type="button" onClick={()=>toast.info('GitHub OAuth — coming soon!')}>
                    <FaGithub/><span>GitHub</span>
                  </button>
                  <button className="social-btn social-btn--linkedin" type="button" onClick={()=>toast.info('LinkedIn OAuth — coming soon!')}>
                    <FaLinkedin/><span>LinkedIn</span>
                  </button>
                </div>
                <div className="auth-divider"><span>or continue with email</span></div>
              </>
            )}

            {/* ── Lockout Banner ───────────────────────────── */}
            {isLocked&&(
              <div className="auth-lockout">
                <FiAlertTriangle/> Too many attempts. Try again in <b>{lockoutCountdown}s</b>
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>

              {/* ══ REGISTER STEP 1: Identity ══ */}
              {isReg&&step===1&&(
                <div className="auth-fields-group">
                  {/* Avatar upload */}
                  <div className="avatar-upload-row">
                    <div className="avatar-preview" onClick={()=>fileInputRef.current?.click()}>
                      {avatarPreview
                        ?<img src={avatarPreview} alt="avatar" className="avatar-img"/>
                        :<div className="avatar-placeholder"><FiCamera size={20}/><span>Photo</span></div>}
                      <div className="avatar-edit-hint"><FiCamera size={10}/></div>
                    </div>
                    <div className="avatar-info">
                      <p className="avatar-title">Profile Photo</p>
                      <p className="avatar-hint">JPG/PNG · Max 5MB</p>
                      <button type="button" className="avatar-btn" onClick={()=>fileInputRef.current?.click()}>
                        Upload Photo
                      </button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleAvatar}/>
                  </div>

                  <AuthField id="auth-name" ref={firstInputRef} icon={<FiUser/>} name="name"
                    placeholder="Full Name *" value={form.name} onChange={handleChange}
                    autoComplete="name" error={fieldError('name')} required maxLength={50}>
                    <span className="char-counter">{form.name.length}/50</span>
                  </AuthField>

                  <AuthField id="auth-username" icon={<FiAtSign/>} name="username"
                    placeholder="Username * (e.g. hassan_dev)" value={form.username}
                    onChange={handleChange} error={fieldError('username')} required maxLength={20}>
                    <span className="char-counter">{form.username.length}/20</span>
                  </AuthField>

                  <AuthField id="auth-email-reg" icon={<FiMail/>} name="email" type="email"
                    placeholder="Email Address *" value={form.email} onChange={handleChange}
                    autoComplete="email" error={fieldError('email')} required
                    suffix={emailBadge&&<span className="email-badge" style={{color:emailBadge.color}}>{emailBadge.label}</span>}/>
                </div>
              )}

              {/* ══ REGISTER STEP 2: Profile ══ */}
              {isReg&&step===2&&(
                <div className="auth-fields-group">
                  {/* Phone */}
                  <div className="auth-field-wrap">
                    <div className="auth-field">
                      <FiPhone className="field-icon"/>
                      <input className="auth-input" name="phone" type="tel"
                        placeholder="Phone Number (optional)"
                        value={form.phone} onChange={handleChange} maxLength={12}/>
                    </div>
                  </div>

                  {/* Country */}
                  <div className="auth-field-wrap">
                    <div className="auth-field select-field">
                      <FiGlobe className="field-icon"/>
                      <select className="auth-input auth-select" name="country"
                        value={form.country} onChange={handleChange} required>
                        <option value="">Select Country *</option>
                        {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="select-arrow">▾</div>
                    </div>
                  </div>

                  {/* Purpose Radio Cards */}
                  <div className="purpose-label">What brings you here?</div>
                  <div className="purpose-cards">
                    {PURPOSES.map(p=>(
                      <label key={p.value} className={`purpose-card ${form.role===p.value?'active':''}`}>
                        <input type="radio" name="role" value={p.value}
                          checked={form.role===p.value} onChange={handleChange} hidden/>
                        <span className="purpose-icon">{p.icon}</span>
                        <span className="purpose-name">{p.label}</span>
                        <span className="purpose-desc">{p.desc}</span>
                      </label>
                    ))}
                  </div>

                  {/* Referral Code */}
                  <div className="auth-field-wrap">
                    <div className="auth-field">
                      <FiGift className="field-icon"/>
                      <input className="auth-input" name="referralCode" type="text"
                        placeholder="Referral Code (optional)" value={form.referralCode}
                        onChange={handleChange} maxLength={20}/>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ REGISTER STEP 3: Security ══ */}
              {isReg&&step===3&&(
                <div className="auth-fields-group">
                  <div className="auth-field">
                    <FiLock className="field-icon"/>
                    <input ref={firstInputRef} className={`auth-input ${fieldError('password')?'input-error':''}`}
                      name="password" type={showPass?'text':'password'}
                      placeholder="Create Password * (min 6 chars)"
                      value={form.password} onChange={handleChange} autoComplete="new-password" required/>
                    <button type="button" className="pass-toggle" onClick={()=>setShowPass(v=>!v)} tabIndex={-1}>
                      {showPass?<FiEyeOff/>:<FiEye/>}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {form.password&&(
                    <div className="pw-strength">
                      <div className="pw-bars">
                        {[1,2,3,4,5].map(i=>(
                          <div key={i} className={`pw-bar ${pwStrength.score>=i?'filled':''}`}
                            style={{background:pwStrength.score>=i?pwStrength.color:undefined}}/>
                        ))}
                      </div>
                      <span className="pw-label" style={{color:pwStrength.color}}>{pwStrength.label}</span>
                    </div>
                  )}

                  {/* Live requirements checklist */}
                  {form.password&&(
                    <div className="pw-checklist">
                      {pwReqs.map((r,i)=>(
                        <span key={i} className={`pw-req ${r.met?'met':''}`}>
                          {r.met?<FiCheck size={10}/>:<span className="req-dot"/>} {r.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="auth-field">
                    <FiShield className="field-icon"/>
                    <input className={`auth-input ${fieldError('confirmPassword')?'input-error':''}`}
                      name="confirmPassword" type={showConfirm?'text':'password'}
                      placeholder="Confirm Password *"
                      value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" required/>
                    <button type="button" className="pass-toggle" onClick={()=>setShowConfirm(v=>!v)} tabIndex={-1}>
                      {showConfirm?<FiEyeOff/>:<FiEye/>}
                    </button>
                  </div>
                  {fieldError('confirmPassword')&&<span className="field-error-msg">{fieldError('confirmPassword')}</span>}

                  {/* Terms */}
                  <label className="auth-terms">
                    <input type="checkbox" className="auth-checkbox" checked={agreedToTerms}
                      onChange={e=>setAgreedToTerms(e.target.checked)}/>
                    <span className="auth-checkbox-custom"/>
                    <span className="auth-terms-text">
                      I agree to the <button type="button" className="auth-link-btn"
                        onClick={()=>toast.info('Terms coming soon!')}>Terms of Service</button> and{' '}
                      <button type="button" className="auth-link-btn"
                        onClick={()=>toast.info('Privacy Policy coming soon!')}>Privacy Policy</button>
                    </span>
                  </label>
                </div>
              )}

              {/* ══ LOGIN FORM ══ */}
              {!isReg&&(
                <div className="auth-fields-group">
                  <AuthField id="auth-email" ref={firstInputRef} icon={<FiMail/>} name="email"
                    type="email" placeholder="Email Address *" value={form.email}
                    onChange={handleChange} autoComplete="email" error={fieldError('email')} required
                    suffix={emailBadge&&<span className="email-badge" style={{color:emailBadge.color}}>{emailBadge.label}</span>}/>

                  <div className="auth-field">
                    <FiLock className="field-icon"/>
                    <input className="auth-input" name="password" type={showPass?'text':'password'}
                      placeholder="Password *" value={form.password} onChange={handleChange}
                      autoComplete="current-password" required/>
                    <button type="button" className="pass-toggle" onClick={()=>setShowPass(v=>!v)} tabIndex={-1}>
                      {showPass?<FiEyeOff/>:<FiEye/>}
                    </button>
                  </div>

                  {/* Remember Me + Forgot */}
                  <div className="login-extra-row">
                    <label className="remember-label">
                      <input type="checkbox" className="auth-checkbox" checked={rememberMe}
                        onChange={e=>setRememberMe(e.target.checked)}/>
                      <span className="auth-checkbox-custom auth-checkbox-sm"/>
                      <span className="remember-text">Remember me</span>
                    </label>
                    <button type="button" className="auth-link-btn forgot-link"
                      onClick={()=>toast.info('Password reset — coming soon!')}>
                      Forgot password?
                    </button>
                  </div>

                  {/* Stay Logged In */}
                  <div className="stay-logged-wrap">
                    <button type="button" className="stay-toggle"
                      onClick={()=>setShowStayOpts(v=>!v)}>
                      <FiClock size={12}/> Stay logged in: <b>{STAY_OPTS.find(o=>o.value===stayLoggedIn)?.label}</b>
                      <FiChevronDown size={12} className={showStayOpts?'rotated':''}/>
                    </button>
                    {showStayOpts&&(
                      <div className="stay-opts">
                        {STAY_OPTS.map(o=>(
                          <button key={o.value} type="button"
                            className={`stay-opt ${stayLoggedIn===o.value?'active':''}`}
                            onClick={()=>{setStayLoggedIn(o.value);setShowStayOpts(false)}}>
                            {o.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* QR suggestion */}
                  <button type="button" className="qr-suggest-btn" onClick={()=>setMode('qr')}>
                    <FaQrcode size={12}/> Sign in with QR code instead
                  </button>
                </div>
              )}

              {/* ── Buttons ───────────────────────────────── */}
              <button id="auth-submit" type="submit" className="auth-submit-btn" disabled={loading||isLocked}>
                {loading
                  ?<><span className="loading-spin"/> {isReg?'Processing...':'Signing In...'}</>
                  :isReg&&step<3
                    ?<>Continue <span className="btn-arrow">→</span></>
                    :isReg
                      ?<><FiCheck/> Create My Account</>
                      :<><FiLogIn/> Sign In to Portfolio</>
                }
              </button>

              {isReg&&step>1&&(
                <button type="button" className="auth-back-btn" onClick={()=>setStep(s=>s-1)}>
                  ← Back
                </button>
              )}
            </form>
          </>
        )}

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="auth-footer">
          <p className="auth-footer-text">
            {!isReg
              ?<>Don't have an account?{' '}<button className="auth-link-btn" onClick={()=>{setMode('register');setStep(1)}}>Register here</button></>
              :<>Already have an account?{' '}<button className="auth-link-btn" onClick={()=>{setMode('login');setStep(1)}}>Sign in</button></>
            }
          </p>
          <div className="auth-security-row">
            <span className="security-badge"><FaFingerprint size={10}/> Biometric Ready</span>
            <span className="security-badge"><FiShield size={10}/> 256-bit SSL</span>
            <span className="security-badge"><FiTrendingUp size={10}/> 99.9% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  )
}
