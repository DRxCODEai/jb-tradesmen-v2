export type ProjectType='Residential'|'Commercial'|'Property Management'
export type Category='Maintenance'|'Repair'|'Remodel'|'Property Assessment'|'Emergency Service'
export type Photo={file:File;url:string}
export type Data={projectType?:ProjectType;category?:Category;service?:string;description:string;condition:string;quantity:string;dimensions:string;outcome:string;materials:boolean;matching:boolean;accessNotes:string;propertyType:string;city:string;state:string;zip:string;occupancy:string;location:string;floor:string;access:string;urgency:string;timing:string;photos:Photo[];firstName:string;lastName:string;email:string;phone:string;contact:string;company:string;consent:boolean}
export type Estimate={laborHours:string;labor:string;materials:string;total:string;duration:string;confidence:'Preliminary'|'Moderate'|'Strong';considerations:string[]}
