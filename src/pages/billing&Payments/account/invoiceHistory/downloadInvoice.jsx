/** @format */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const downloadInvoice = (row) => {
	const doc = new jsPDF({
		orientation: 'portrait', // or "landscape"
		unit: 'mm',
		format: 'a3', // Change to "a2" or "a1" for a bigger page
	});

	// Invoice Header
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(28);
	doc.text('ACE TAXIS', 20, 30);
	doc.setFontSize(14);
	doc.text('www.acetaxisdorset.co.uk', 20, 40);
	doc.text('bookings@acetaxisdorset.co.uk', 20, 50);
	doc.text('01747 82 11 11', 20, 60);

	// Invoice Details
	doc.setFontSize(18);
	doc.text('INVOICE', 220, 30);
	doc.setFontSize(14);
	doc.text(`INVOICE #: ${row.id}`, 220, 40);
	doc.text(`DATE: ${new Date(row.date).toLocaleDateString('en-GB')}`, 220, 50);
	doc.text(`ACCOUNT NO: ${row.accNumber}`, 220, 60);

	// Invoice Summary
	doc.setFontSize(18);
	doc.text('INVOICE SUMMARY', 100, 100);
	doc.line(20, 105, 280, 105);

	// Amounts
	doc.setFontSize(14);
	doc.text('NET:', 200, 120);
	doc.text(`£${row.net.toFixed(2)}`, 250, 120);
	doc.text('VAT:', 200, 130);
	doc.text(`£${row.vat.toFixed(2)}`, 250, 130);
	doc.text('TOTAL:', 200, 140);
	doc.text(`£${row.total.toFixed(2)}`, 250, 140);
	doc.line(20, 150, 280, 150);

	// Table for Job Details
	const tableData = row.items.map((item) => [
		item.jobNo,
		new Date(item.date).toLocaleDateString('en-GB'),
		item.passenger,
		item.pickup,
		item.destination,
		`£${item.parking.toFixed(2)}`,
		`£${item.waiting.toFixed(2)}`,
		`£${item.journey.toFixed(2)}`,
		`£${item.total.toFixed(2)}`,
		`£${item.totalInc?.toFixed(2)}`,
	]);

	autoTable(doc, {
		startY: 160,
		head: [
			[
				'JOB #',
				'DATE',
				'PASSENGER',
				'PICKUP',
				'DESTINATION',
				'PARKING',
				'WAITING TIME',
				'JOURNEY',
				'TOTAL EX',
				'TOTAL INC',
			],
		],
		body: tableData,
		theme: 'grid',
		styles: { fontSize: 10, cellPadding: 3 },
	});

	// Footer
	doc.setFontSize(10);
	doc.text('VAT NUMBER: 325 1273 31', 15, doc.internal.pageSize.height - 10);
	doc.text('COMPANY NO: 08920974', 80, doc.internal.pageSize.height - 10);

	// Save the PDF
	doc.save(`Invoice_${row.id}.pdf`);
};
