 export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ht, dob, board, year, mode } = req.query;
  if (!ht || !board || !year) {
    return res.status(400).send('<p class="text-red-600 font-bold p-4 text-center">Error: Required parameters missing.</p>');
  }

  res.setHeader('Content-Type', 'text/html');

  if (mode === 'admit_cards') {
    // Generate Hall Ticket / Admit Card layout based on queried year
    return res.status(200).send(`
      <div class="space-y-3">
        <div class="bg-blue-50 border border-blue-200 p-3 rounded">
          <h4 class="font-black text-blue-900 text-xs mb-1 uppercase">EXAMINATION HALL TICKET - ${year} SESSION</h4>
          <p class="text-[10px] text-slate-700">Candidate is provisionally permitted to appear for the <b>${board}</b> examinations for the academic year ${year}.</p>
        </div>
        <div class="grid grid-cols-2 gap-2 text-[10px] font-semibold border border-slate-300 p-2 rounded">
          <div>Center Code: <span class="font-bold text-black">42018 - GOVT JR COLLEGE</span></div>
          <div>Medium: <span class="font-bold text-black">ENGLISH / TELUGU</span></div>
          <div>Exam Timing: <span class="font-bold text-black">09:00 AM - 12:00 PM</span></div>
          <div>Admit Status: <span class="font-bold text-emerald-700">VERIFIED & ISSUED</span></div>
        </div>
      </div>
    `);
  } else {
    // Generate Results Marks Memo table based on queried year
    const mockStudentData = [
      { code: "01", name: `ENGLISH PAPER-I (${year} EXAM)`, max: 100, sec: 95, grade: "A1" },
      { code: "02", name: "SECOND LANGUAGE (TELUGU)", max: 100, sec: 98, grade: "A1" },
      { code: "03", name: "MATHEMATICS PAPER-1A", max: 75, sec: 74, grade: "A1" },
      { code: "04", name: "MATHEMATICS PAPER-1B", max: 75, sec: 75, grade: "A1" },
      { code: "05", name: "PHYSICS (THEORY & LAB)", max: 60, sec: 58, grade: "A1" },
      { code: "06", name: "CHEMISTRY (THEORY & LAB)", max: 60, sec: 57, grade: "A1" }
    ];

    let rowsHtml = '<div class="overflow-x-auto"><table class="w-full text-[10px] text-left border-collapse border border-slate-400"><thead><tr class="bg-blue-950 text-white text-center font-bold"><th class="border border-slate-400 p-1.5 w-12">CODE</th><th class="border border-slate-400 p-1.5 text-left">SUBJECT NAME</th><th class="border border-slate-400 p-1.5 w-20">MAX</th><th class="border border-slate-400 p-1.5 w-24">SECURED</th><th class="border border-slate-400 p-1.5 w-16">GRADE</th></tr></thead><tbody class="font-semibold text-center">';
    let totalMax = 0, totalSecured = 0;

    mockStudentData.forEach((s, idx) => {
      const bg = idx % 2 === 1 ? 'bg-slate-50' : '';
      totalMax += s.max; totalSecured += s.sec;
      rowsHtml += `<tr class="${bg} border-b border-slate-300"><td class="border border-slate-400 p-1.5 font-bold">${s.code}</td><td class="border border-slate-400 p-1.5 text-left font-bold">${s.name}</td><td class="border border-slate-400 p-1.5">${s.max}</td><td class="border border-slate-400 p-1.5 font-bold">${s.sec}</td><td class="border border-slate-400 p-1.5 text-emerald-700 font-bold">${s.grade}</td></tr>`;
    });

    rowsHtml += `<tr class="bg-slate-200 font-bold"><td colspan="2" class="border border-slate-400 p-1.5 text-right">TOTAL (${year}):</td><td class="border border-slate-400 p-1.5">${totalMax}</td><td class="border border-slate-400 p-1.5 text-blue-900 font-black">${totalSecured}</td><td class="border border-slate-400 p-1.5 text-emerald-800">PASSED</td></tr></tbody></table></div>`;
    return res.status(200).send(rowsHtml);
  }
}
