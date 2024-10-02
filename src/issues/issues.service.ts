import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'path';
import * as convert from 'xml-js';

function convertJsonToXml(json) {
  const options = { compact: true, ignoreComment: true, spaces: 4 };
  return convert.json2xml(json, options);
}

const filePath = path.join(
  path.resolve(__dirname, '..'),
  'data/inventory_issues.json',
);
const issuesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function saveData() {
  fs.writeFileSync(filePath, JSON.stringify(issuesData));
}
@Injectable()
export class IssuesService {
  getAllIssues(xml?: string) {
    if (xml === 'true') {
      return convertJsonToXml(issuesData);
    } else {
      return issuesData;
    }
  }

  createIssue(Issue: any) {
    issuesData.push({
      id_issue: issuesData[issuesData.length - 1].id_issue + 1,
      ...Issue,
    });
    saveData();
    return { message: 'Estado creado satisfactoriamente' };
  }

  getIssue(idIssue: number, xml: string) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != idIssue
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      if (xml === 'true') {
        return convertJsonToXml(issuesData[contadorIssues]);
      } else {
        return issuesData[contadorIssues];
      }
    } else {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  updateIssue(IssueUpdated) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != IssueUpdated.id_issue
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      issuesData[contadorIssues] = IssueUpdated;
      saveData();
      return issuesData[contadorIssues];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
  deleteIssue(id: number) {
    let contadorIssues = 0;
    while (
      contadorIssues < issuesData.length &&
      issuesData[contadorIssues].id_issue != id
    ) {
      contadorIssues++;
    }
    if (issuesData[contadorIssues]) {
      issuesData.splice(contadorIssues, 1);
      saveData();
      return issuesData[contadorIssues];
    } else throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
