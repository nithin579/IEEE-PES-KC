'use client';
import Image from 'next/image';
import PageLayout from '../components/PageLayout';
import Link from 'next/link';

// ── Professional Execom (dummy placeholder) ──────────────────────────────────
const PROFESSIONAL_EXECOM = [
    { name: 'Dr. A Sathyanarayana', role: 'Chairperson', imageUrl: null },
    { name: 'Er. Rajesh Kumar M', role: 'Vice Chairperson', imageUrl: null },
    { name: 'Dr. Priya Nair', role: 'Secretary', imageUrl: null },
    { name: 'Er. Suresh Babu K', role: 'Treasurer', imageUrl: null },
    { name: 'Dr. Anitha Rajan', role: 'Joint Secretary', imageUrl: null },
    { name: 'Er. Vinod P V', role: 'Immediate Past Chair', imageUrl: null },
];

// ── Young Professionals (dummy placeholder) ───────────────────────────────────
const YOUNG_PROFESSIONALS = [
    { name: 'Er. Anjali Krishnan', role: 'YP Chair', imageUrl: null },
    { name: 'Er. Rohit Nambiar', role: 'YP Vice Chair', imageUrl: null },
    { name: 'Er. Deepa Suresh', role: 'YP Secretary', imageUrl: null },
    { name: 'Er. Arun Mathew', role: 'YP Treasurer', imageUrl: null },
];

// ── Student Leadership Team ───────────────────────────────────────────────────
const STUDENT_LEADERSHIP = [
    { name: 'ARAVIND R',           role: 'Student Representative',              imageUrl: '/images/ieee-images/execom25/Aravind_R.jpg' },
    { name: 'ANVITHA VINOD',       role: 'Women in Power SR',                   imageUrl: '/images/ieee-images/execom25/Anvitha Vinod.jpg' },
    { name: 'ANANDHU REGI',        role: 'Technical Coordinator',               imageUrl: '/images/ieee-images/execom25/Anandhu Regi.jpg' },
    { name: 'DEEPTHI N',           role: 'HSR Travancore Hub',                  imageUrl: '/images/ieee-images/execom25/Deepthi N_.jpg' },
    { name: 'ASHNA KS',            role: 'HSR Kochi Hub',                       imageUrl: '/images/ieee-images/execom25/Ashna K S.jpg' },
    { name: 'VIDHU KRISHNAN',      role: 'HSR Malabar Hub',                     imageUrl: '/images/ieee-images/execom25/Vidhu Krishnan_.jpg' },
    { name: 'FISA FATHIMA FEROSZE',role: 'MDC Travancore Hub',                  imageUrl: '/images/ieee-images/execom25/Fisa fathima.jpg' },
    { name: 'JES GIGO',            role: 'MDC Kochi Hub',                       imageUrl: '/images/ieee-images/execom25/Jes Gigo_.jpg' },
    { name: 'SAHADIYA M',          role: 'MDC Malabar Hub',                     imageUrl: '/images/ieee-images/execom25/sahadiya.jpg' },
    { name: 'HARITHA K SURESH',    role: 'ECC',                                 imageUrl: '/images/ieee-images/execom25/haritha K suresh.jpg' },
    { name: 'SREEHARI R',          role: 'Newsletter Editor',                   imageUrl: '/images/ieee-images/execom25/Sreehari.jpg' },
    { name: 'KRISHNENDU KV',       role: 'Content Lead',                        imageUrl: '/images/ieee-images/execom25/Krishnendu.jpg' },
    { name: 'FATHIMA SANA E',      role: 'Content Creator',                     imageUrl: '/images/ieee-images/execom25/Fathima Sana.jpg' },
    { name: 'SREYA B',             role: 'Documentation and Report Coordinator',imageUrl: '/images/ieee-images/execom25/Sreya.jpg' },
    { name: 'AMAL ROSH M',         role: 'Industry Internship Coordinator',     imageUrl: '/images/ieee-images/execom25/Amal Rosh.jpg' },
    { name: 'GOKUL G K',           role: 'Webmaster',                           imageUrl: '/images/ieee-images/execom25/Gokul G K.jpg' },
    { name: 'JOVIN JOHN',          role: 'Webmaster',                           imageUrl: '/images/ieee-images/execom25/jovinjohn.jpg' },
    { name: 'NANDANA RAJESH',      role: 'Design Lead',                         imageUrl: '/images/ieee-images/execom25/Nandana Rajesh.jpg' },
    { name: 'BILAL M',             role: 'Design Lead',                         imageUrl: '/images/ieee-images/execom25/Bilal.jpg' },
];

// ── Reusable member card ──────────────────────────────────────────────────────
function MemberCard({ member }) {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="execom-card">
                <div className="execom-image-frame">
                    <div className="execom-avatar-border">
                        <div className="execom-avatar">
                            {member.imageUrl ? (
                                <Image
                                    src={member.imageUrl}
                                    alt={member.name}
                                    fill
                                    sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, (max-width: 992px) 33vw, 25vw"
                                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                                />
                            ) : (
                                <div className="execom-avatar-placeholder">
                                    <i className="ri-user-3-line"></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <p className="execom-role">{member.role}</p>
                <h4 className="execom-name">{member.name}</h4>
            </div>
        </div>
    );
}

// ── Section block ─────────────────────────────────────────────────────────────
function Section({ title, desc, members }) {
    return (
        <div className="mb-5 pb-3">
            <div className="mb-4 text-start">
                <h3 style={{ color: 'var(--header-color)', fontWeight: 700, margin: 0, fontSize: '1.8rem' }}>
                    {title}
                </h3>
                {desc && (
                    <p style={{ color: '#666', margin: '6px 0 0 0', fontSize: '0.95rem' }}>{desc}</p>
                )}
            </div>
            <div className="row g-4 justify-content-center">
                {members.map((m, i) => <MemberCard key={i} member={m} />)}
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Execom25Page() {
    return (
        <PageLayout>
            <section className="section-padding bg-diagonal-pattern">
                <div className="container">

                    {/* Page Header */}
                    <div className="section-header text-start mb-5 pb-4">
                        <span className="text-uppercase" style={{ color: 'var(--pes-green)', fontWeight: 600, letterSpacing: '1.5px', fontSize: '13px' }}>
                            Leadership 2025
                        </span>
                        <h2 className="section-title mt-2 mb-3" style={{ color: 'var(--header-color)', fontWeight: 800, fontSize: '2.5rem' }}>
                            Executive Committee 2025
                        </h2>
                        <p className="section-desc mb-0" style={{ maxWidth: '800px', fontSize: '1.05rem', color: '#555', lineHeight: '1.7', marginLeft: 0 }}>
                            The IEEE PES Kerala Section 2025 Executive Committee — a dedicated team of professionals,
                            young engineers, and student leaders committed to advancing power and energy excellence.
                        </p>
                    </div>

                    {/* Three sections */}
                    <Section
                        title="Professional Execom"
                        desc="Core leadership guiding the strategic vision of the section."
                        members={PROFESSIONAL_EXECOM}
                    />

                    <Section
                        title="Young Professionals"
                        desc="Empowering the next generation of power and energy leaders."
                        members={YOUNG_PROFESSIONALS}
                    />

                    <Section
                        title="Student Leadership Team"
                        desc="Driving student engagement and campus initiatives across Kerala."
                        members={STUDENT_LEADERSHIP}
                    />

                    {/* Footer link */}
                    <div className="text-center mt-5 pt-4 border-top">
                        <Link href="/pages/execom" className="btn btn-outline-success px-4 py-2 rounded-pill fw-bold" style={{ fontSize: '0.9rem' }}>
                            View Current Executive Committee <i className="ri-arrow-right-line ms-1"></i>
                        </Link>
                    </div>

                </div>
            </section>
        </PageLayout>
    );
}
