import express from 'express';

interface Controller {
  path: string
  router: express.IRouter
}

export default Controller;