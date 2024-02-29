import {response, request} from "express";
import Company from './company.js';

export const companyPost = async (req, res)=>{
    const {nombre, correo, telefono, nacionalidad, nivelImpacto, añosTrayectoria, categoria} = req.body;
    const company = new Company( {nombre, correo, telefono, nacionalidad, nivelImpacto, añosTrayectoria, categoria});
    await company.save();
    res.status(200).json({
        company
    });
}

export const companyGet = async (req= request, res= response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        companies
    });
}

export const companiesGetAZ = async (req = request, res= response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
            .sort({nombre: 1})
            .skip(Number(desde))
            .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            companies
        })
    } catch (error){
        console.log(error);
        res.status(500).json({
            msg: 'Error to list companies'
        });
        
    }
}

export const companiesGetZA = async (req = request, res=response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
            .sort({nombre: -1})
            .skip(Number(desde))
            .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            companies
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to list companies'
        });
    }
}

export const companyYearsTrayectory = async (req = request, res = response)=>{
    const {limite , desde } = req.query;
    const query = {estado: true};

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
            .sort({añosTrayectoria: -1})
            .skip(Number(desde))
            .limit(Number(limite))
        ]);
        res.status(200).json({
            total,
            companies
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to list companies'
        })
    }
}

export const companiesPut = async (req, res = response)=>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;
    await Company.findByIdAndUpdate(id, resto);

    const companies = await Company.findOne({_id: id});
    res.status(200).json({
        msg: 'User update',
        companies
    });
}

export const generateExcelReport = async (req, res) =>{
    try {
        const companies = await Company.find({}).exec();
        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet('companies');
        worksheet.addRow(['Company Name', 'Company Email', 'Company Phone', 'Nationality', 'Level Of Impact', 'Years Of Trayectory', 'Category']);
        companies.forEach(companies =>{
            worksheet.addRow([
                companies.nombre,
                companies.correo,
                companies.telefono,
                companies.nacionalidad,
                companies.nivelImpacto,
                companies.añosTrayectoria,
                companies.categoria
            ]);
        });
        const buffer = await workbook.xlsx.writeBuffer();

        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename="report_companies.xlsx"');
        res.send(buffer);
    } catch (error) {
        console.log(e);
        res.status(500).json({
            msg: "Report no generated"
        })
    }
};